import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ScanLine, 
  Camera, 
  Search, 
  BookOpen, 
  CheckCircle, 
  XCircle,
  Plus,
  Minus,
  ShoppingCart
} from "lucide-react";

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  coverUrl?: string;
  availableCopies: number;
  totalCopies: number;
  courseTag?: string;
  shelfLocation?: string;
}

interface CartItem extends Book {
  quantity: number;
}

const BorrowBook = () => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual' | null>(null);
  const [isbnInput, setIsbnInput] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock book data
  const mockBooks: Book[] = [
    {
      id: "1",
      isbn: "9780134685991",
      title: "Introduction to Psychology",
      author: "Dr. Sarah Smith",
      availableCopies: 3,
      totalCopies: 5,
      courseTag: "PSYC101",
      shelfLocation: "A2-15"
    },
    {
      id: "2", 
      isbn: "9780321997159",
      title: "Advanced Mathematics",
      author: "Prof. Michael Johnson",
      availableCopies: 2,
      totalCopies: 4,
      courseTag: "MATH201",
      shelfLocation: "B1-08"
    },
    {
      id: "3",
      isbn: "9780134543631",
      title: "World History: Modern Era",
      author: "Dr. Anna Wilson",
      availableCopies: 4,
      totalCopies: 6,
      courseTag: "HIST150",
      shelfLocation: "C3-22"
    }
  ];

  const handleManualSearch = async () => {
    if (!isbnInput.trim()) {
      toast({
        title: "Please enter an ISBN",
        description: "Enter a valid ISBN to search for books.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockBooks.filter(book => 
        book.isbn.includes(isbnInput) || 
        book.title.toLowerCase().includes(isbnInput.toLowerCase()) ||
        book.author.toLowerCase().includes(isbnInput.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
      
      if (results.length === 0) {
        toast({
          title: "No books found",
          description: "Try a different ISBN or search term.",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleCameraCapture = async () => {
    toast({
      title: "Camera scanning",
      description: "Point your camera at the book's barcode. This is a demo - scanning simulation will appear.",
    });
    
    // Simulate camera scanning
    setTimeout(() => {
      const randomBook = mockBooks[Math.floor(Math.random() * mockBooks.length)];
      setSearchResults([randomBook]);
      setScanMode(null);
      toast({
        title: "Book scanned!",
        description: `Found: ${randomBook.title}`,
      });
    }, 2000);
  };

  const addToCart = (book: Book) => {
    const existingItem = cart.find(item => item.id === book.id);
    
    if (existingItem) {
      if (existingItem.quantity >= book.availableCopies) {
        toast({
          title: "Maximum copies reached",
          description: `Only ${book.availableCopies} copies available.`,
          variant: "destructive"
        });
        return;
      }
      setCart(cart.map(item => 
        item.id === book.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }

    toast({
      title: "Added to cart",
      description: `${book.title} added to your borrowing cart.`,
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === bookId) {
        const newQuantity = Math.max(0, Math.min(item.availableCopies, item.quantity + change));
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const completeBorrow = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some books to borrow first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate borrowing process
    setTimeout(() => {
      setIsLoading(false);
      setCart([]);
      setSearchResults([]);
      setIsbnInput("");
      
      toast({
        title: "Books borrowed successfully!",
        description: `${cart.reduce((total, item) => total + item.quantity, 0)} book(s) borrowed. Due date: ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Borrow Books</h1>
        <p className="text-muted-foreground">Scan or search for books to add to your borrowing cart.</p>
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
            <p className="text-sm text-muted-foreground">Enter ISBN or search by title/author</p>
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
                <ScanLine className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
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
            <CardDescription>Enter ISBN, title, or author name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter ISBN, title, or author..."
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>{searchResults.length} book(s) found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchResults.map((book) => (
              <div key={book.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="w-16 h-20 bg-muted rounded-md flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                  <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {book.courseTag && (
                      <Badge variant="secondary">{book.courseTag}</Badge>
                    )}
                    <Badge 
                      variant={book.availableCopies > 0 ? "default" : "destructive"}
                      className={book.availableCopies > 0 ? "bg-available text-available-foreground" : ""}
                    >
                      {book.availableCopies > 0 ? (
                        <><CheckCircle className="w-3 h-3 mr-1" /> {book.availableCopies} available</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" /> Not available</>
                      )}
                    </Badge>
                    {book.shelfLocation && (
                      <Badge variant="outline">{book.shelfLocation}</Badge>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => addToCart(book)}
                  disabled={book.availableCopies === 0}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Borrowing Cart */}
      {cart.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Borrowing Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
            </CardTitle>
            <CardDescription>Review your books before borrowing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg bg-primary-light/20 border border-primary/20">
                <div className="w-12 h-16 bg-white rounded-md flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">by {item.author}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.courseTag && (
                      <Badge variant="secondary">{item.courseTag}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= item.availableCopies}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Due date: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setCart([])}>
                  Clear Cart
                </Button>
                <Button onClick={completeBorrow} disabled={isLoading}>
                  {isLoading ? "Processing..." : `Borrow ${cart.reduce((total, item) => total + item.quantity, 0)} Book(s)`}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowBook;