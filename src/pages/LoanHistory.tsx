import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Download,
  Eye
} from "lucide-react";

interface Loan {
  id: string;
  bookTitle: string;
  author: string;
  isbn: string;
  borrowedAt: Date;
  dueAt: Date;
  returnedAt?: Date;
  status: 'borrowed' | 'returned' | 'overdue';
  lateFee?: number;
  renewalCount?: number;
}

const LoanHistory = () => {
  const [selectedTab, setSelectedTab] = useState("current");

  // Mock loan data
  const currentLoans: Loan[] = [
    {
      id: "loan_001",
      bookTitle: "Introduction to Psychology",
      author: "Dr. Sarah Smith",
      isbn: "9780134685991",
      borrowedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      dueAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      status: 'borrowed',
      renewalCount: 0
    },
    {
      id: "loan_002",
      bookTitle: "Advanced Mathematics",
      author: "Prof. Michael Johnson", 
      isbn: "9780321997159",
      borrowedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      dueAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'overdue',
      lateFee: 40,
      renewalCount: 1
    }
  ];

  const pastLoans: Loan[] = [
    {
      id: "loan_003",
      bookTitle: "World History: Modern Era",
      author: "Dr. Anna Wilson",
      isbn: "9780134543631", 
      borrowedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      dueAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
      status: 'returned',
      renewalCount: 0
    },
    {
      id: "loan_004",
      bookTitle: "Organic Chemistry Fundamentals",
      author: "Prof. David Lee",
      isbn: "9780321996159",
      borrowedAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000),
      dueAt: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000),
      status: 'returned',
      lateFee: 30,
      renewalCount: 0
    },
    {
      id: "loan_005",
      bookTitle: "English Literature Anthology",
      author: "Various Authors",
      isbn: "9780134587431",
      borrowedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      dueAt: new Date(Date.now() - 76 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(Date.now() - 76 * 24 * 60 * 60 * 1000),
      status: 'returned',
      renewalCount: 2
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDaysOverdue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (loan: Loan) => {
    switch (loan.status) {
      case 'borrowed':
        const daysUntilDue = getDaysUntilDue(loan.dueAt);
        if (daysUntilDue <= 2) {
          return (
            <Badge variant="destructive" className="bg-on-loan text-on-loan-foreground">
              <Clock className="w-3 h-3 mr-1" />
              Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
            </Badge>
          );
        }
        return (
          <Badge variant="default" className="bg-available text-available-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Due in {daysUntilDue} days
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {getDaysOverdue(loan.dueAt)} days overdue
          </Badge>
        );
      case 'returned':
        return (
          <Badge variant="default" className="bg-available text-available-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Returned
          </Badge>
        );
    }
  };

  const LoanCard = ({ loan }: { loan: Loan }) => (
    <div className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors">
      <div className="w-12 h-16 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{loan.bookTitle}</h4>
        <p className="text-sm text-muted-foreground mb-2">by {loan.author}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <div>
            <span className="font-medium">Borrowed:</span> {formatDate(loan.borrowedAt)}
          </div>
          <div>
            <span className="font-medium">Due:</span> {formatDate(loan.dueAt)}
          </div>
          {loan.returnedAt && (
            <div>
              <span className="font-medium">Returned:</span> {formatDate(loan.returnedAt)}
            </div>
          )}
          <div>
            <span className="font-medium">ISBN:</span> {loan.isbn}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {getStatusBadge(loan)}
          
          {loan.renewalCount && loan.renewalCount > 0 && (
            <Badge variant="outline">
              Renewed {loan.renewalCount}x
            </Badge>
          )}
          
          {loan.lateFee && loan.lateFee > 0 && (
            <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
              Late fee: ${(loan.lateFee / 100).toFixed(2)}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 flex-shrink-0">
        <Button size="sm" variant="outline">
          <Eye className="w-3 h-3 mr-1" />
          Details
        </Button>
        {loan.status === 'borrowed' && (
          <Button size="sm" variant="default">
            Renew
          </Button>
        )}
      </div>
    </div>
  );

  const totalCurrentLoans = currentLoans.length;
  const overdueLoans = currentLoans.filter(loan => loan.status === 'overdue').length;
  const totalPastLoans = pastLoans.length;
  const totalLateFees = [...currentLoans, ...pastLoans]
    .filter(loan => loan.lateFee)
    .reduce((sum, loan) => sum + (loan.lateFee || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Loan History</h1>
        <p className="text-muted-foreground">Track your current and past book loans.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalCurrentLoans}</div>
            <div className="text-sm text-muted-foreground">Current Loans</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-overdue mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{overdueLoans}</div>
            <div className="text-sm text-muted-foreground">Overdue Books</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-available mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalPastLoans}</div>
            <div className="text-sm text-muted-foreground">Books Returned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">${(totalLateFees / 100).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Late Fees</div>
          </CardContent>
        </Card>
      </div>

      {/* Loan History Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="current">Current Loans ({totalCurrentLoans})</TabsTrigger>
            <TabsTrigger value="past">Past Loans ({totalPastLoans})</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Current Loans</span>
              </CardTitle>
              <CardDescription>
                Books you currently have on loan. Remember to return them on time to avoid late fees.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentLoans.length > 0 ? (
                currentLoans.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No current loans</h3>
                  <p className="text-muted-foreground mb-4">You don't have any books on loan right now.</p>
                  <Button asChild>
                    <a href="/borrow">Borrow a Book</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Past Loans</span>
              </CardTitle>
              <CardDescription>
                Your complete borrowing history with return dates and any applicable fees.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastLoans.length > 0 ? (
                pastLoans.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))
              ) : (
                <div className="text-center py-8">
                  <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No loan history</h3>
                  <p className="text-muted-foreground">You haven't borrowed any books yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Outstanding Fees Notice */}
      {totalLateFees > 0 && (
        <Card className="border-overdue/50 bg-overdue/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-overdue">
              <AlertTriangle className="w-5 h-5" />
              <span>Outstanding Late Fees</span>
            </CardTitle>
            <CardDescription>
              Please pay your late fees to maintain your borrowing privileges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-foreground">
                  Total Outstanding: ${(totalLateFees / 100).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact library staff to arrange payment
                </p>
              </div>
              <Button variant="default" className="bg-overdue hover:bg-overdue/90">
                Contact Library
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoanHistory;