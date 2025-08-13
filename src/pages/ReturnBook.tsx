import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  RotateCcw, 
  Camera, 
  Search, 
  BookOpen, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Calendar
} from "lucide-react";

interface LoanedBook {
  id: string;
  loanId: string;
  isbn: string;
  title: string;
  author: string;
  borrowedAt: Date;
  dueAt: Date;
  isOverdue: boolean;
  lateFee?: number;
  shelfLocation?: string;
}

const ReturnBook = () => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual' | null>(null);
  const [isbnInput, setIsbnInput] = useState("");
  const [foundBook, setFoundBook] = useState<LoanedBook | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock loaned books data
  const mockLoanedBooks: LoanedBook[] = [
    {
      id: "1",
      loanId: "loan_001",
      isbn: "9780134685991",
      title: "Introduction to Psychology",
      author: "Dr. Sarah Smith",
      borrowedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      dueAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      isOverdue: false,
      shelfLocation: "A2-15"
    },
    {
      id: "2",
      loanId: "loan_002", 
      isbn: "9780321997159",
      title: "Advanced Mathematics",
      author: "Prof. Michael Johnson",
      borrowedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
      dueAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days overdue
      isOverdue: true,
      lateFee: 40, // 4 days * $0.10 per day
      shelfLocation: "B1-08"
    }
  ];

  const handleManualSearch = async () => {
    if (!isbnInput.trim()) {
      toast({
        title: "Please enter an ISBN",
        description: "Enter the ISBN of the book you want to return.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const book = mockLoanedBooks.find(book => 
        book.isbn.includes(isbnInput) || 
        book.title.toLowerCase().includes(isbnInput.toLowerCase())
      );
      
      setFoundBook(book || null);
      setIsLoading(false);
      
      if (!book) {
        toast({
          title: "Book not found",
          description: "This book is not currently on loan to you, or the ISBN is incorrect.",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleCameraCapture = async () => {
    toast({
      title: "Camera scanning",
      description: "Point your camera at the book's barcode to scan.",
    });
    
    // Simulate camera scanning
    setTimeout(() => {
      const randomBook = mockLoanedBooks[Math.floor(Math.random() * mockLoanedBooks.length)];
      setFoundBook(randomBook);
      setScanMode(null);
      toast({
        title: "Book scanned!",
        description: `Found: ${randomBook.title}`,
      });
    }, 2000);
  };

  const handleReturn = async () => {
    if (!foundBook) return;

    setIsLoading(true);
    
    // Simulate return process
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Book returned successfully!",
        description: foundBook.isOverdue 
          ? `Book returned. Late fee: $${(foundBook.lateFee! / 100).toFixed(2)}` 
          : "Thank you for returning your book on time!",
        variant: foundBook.isOverdue ? "destructive" : "default"
      });
      
      setFoundBook(null);
      setIsbnInput("");
      setScanMode(null);
    }, 1500);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysOverdue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Return Books</h1>
        <p className="text-muted-foreground">Scan or search for the book you want to return.</p>
      </div>

      {/* Scanning Options */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setScanMode('camera')}>
          <CardContent className="p-6 text-center">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Camera Scanner</h3>
            <p className="text-sm text-muted-foreground">Use your device camera to scan book barcodes</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setScanMode('manual')}>
          <CardContent className="p-6 text-center">
            <Search className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Manual Search</h3>
            <p className="text-sm text-muted-foreground">Enter ISBN or search by title</p>
          </CardContent>
        </Card>
      </div>

      {/* Camera Scanning Mode */}
      {scanMode === 'camera' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Camera Scanner</span>
            </CardTitle>
            <CardDescription>Point your camera at the book's barcode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <RotateCcw className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Camera view would appear here</p>
                <Button onClick={handleCameraCapture} className="mt-4">
                  Simulate Scan
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setScanMode(null)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Search Mode */}
      {scanMode === 'manual' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Manual Search</span>
            </CardTitle>
            <CardDescription>Enter ISBN or title of the book to return</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter ISBN or book title..."
                value={isbnInput}
                onChange={(e) => setIsbnInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                className="flex-1"
              />
              <Button onClick={handleManualSearch} disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
            <Button onClick={() => setScanMode(null)} variant="outline">
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Found Book */}
      {foundBook && (
        <Card className={foundBook.isOverdue ? "border-overdue/50 bg-overdue/5" : "border-available/50 bg-available/5"}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Book Found</span>
            </CardTitle>
            <CardDescription>Confirm the details before returning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-28 bg-muted rounded-md flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">{foundBook.title}</h3>
                <p className="text-muted-foreground mb-1">by {foundBook.author}</p>
                <p className="text-sm text-muted-foreground mb-3">ISBN: {foundBook.isbn}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Borrowed:</span>
                    </div>
                    <p className="text-muted-foreground">{formatDate(foundBook.borrowedAt)}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Due Date:</span>
                    </div>
                    <p className={foundBook.isOverdue ? "text-overdue font-medium" : "text-muted-foreground"}>
                      {formatDate(foundBook.dueAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              {foundBook.isOverdue ? (
                <>
                  <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {getDaysOverdue(foundBook.dueAt)} days overdue
                  </Badge>
                  {foundBook.lateFee && foundBook.lateFee > 0 && (
                    <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
                      Late fee: ${(foundBook.lateFee / 100).toFixed(2)}
                    </Badge>
                  )}
                </>
              ) : (
                <Badge variant="default" className="bg-available text-available-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  On time
                </Badge>
              )}
              
              {foundBook.shelfLocation && (
                <Badge variant="outline">
                  Return to: {foundBook.shelfLocation}
                </Badge>
              )}
            </div>

            {/* Late Fee Warning */}
            {foundBook.isOverdue && foundBook.lateFee && foundBook.lateFee > 0 && (
              <div className="p-4 rounded-lg bg-overdue/10 border border-overdue/20">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-overdue" />
                  <h4 className="font-semibold text-overdue">Late Fee Notice</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  A late fee of <strong>${(foundBook.lateFee / 100).toFixed(2)}</strong> has been applied 
                  for returning this book {getDaysOverdue(foundBook.dueAt)} days late. 
                  Please speak with library staff about payment options.
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFoundBook(null);
                  setIsbnInput("");
                  setScanMode(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleReturn} 
                disabled={isLoading}
                className={foundBook.isOverdue ? "bg-overdue hover:bg-overdue/90" : ""}
              >
                {isLoading ? "Processing..." : `Return Book${foundBook.isOverdue ? ` (${getDaysOverdue(foundBook.dueAt)} days late)` : ""}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Loans Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Loans</CardTitle>
          <CardDescription>Quick access to books you currently have on loan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockLoanedBooks.map((book) => (
            <div 
              key={book.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
              onClick={() => setFoundBook(book)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-10 bg-white rounded flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">Due: {formatDate(book.dueAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {book.isOverdue ? (
                  <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Overdue
                  </Badge>
                ) : (
                  <Badge variant="default" className="bg-available text-available-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    On time
                  </Badge>
                )}
                <Button size="sm" variant="outline">
                  Return
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnBook;