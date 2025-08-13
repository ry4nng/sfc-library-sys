import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ScanLine, 
  RotateCcw, 
  History, 
  TrendingUp, 
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  BookMarked
} from "lucide-react";

const Home = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalBooks: 1247,
    availableBooks: 1089,
    onLoan: 158,
    overdueBooks: 12,
    activeUsers: 342,
    newBooks: 23
  };

  const recentActivity = [
    { id: 1, user: "Sarah Johnson", action: "borrowed", book: "Introduction to Psychology", time: "2 hours ago" },
    { id: 2, user: "Mike Chen", action: "returned", book: "Advanced Mathematics", time: "3 hours ago" },
    { id: 3, user: "Emma Wilson", action: "borrowed", book: "World History", time: "5 hours ago" },
  ];

  const popularBooks = [
    { id: 1, title: "Introduction to Psychology", author: "Dr. Smith", loans: 45, available: 3 },
    { id: 2, title: "Advanced Mathematics", author: "Prof. Johnson", loans: 38, available: 2 },
    { id: 3, title: "World History", author: "A. Wilson", loans: 32, available: 4 },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-hover to-secondary p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to SFC Digital Library</h1>
          <p className="text-lg text-primary-light mb-6 max-w-2xl">
            Your gateway to knowledge. Borrow books, track your reading history, and discover new titles with our modern library management system.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/borrow" className="flex items-center space-x-2">
                <ScanLine className="w-5 h-5" />
                <span>Borrow a Book</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link to="/return" className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5" />
                <span>Return a Book</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.totalBooks.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Books</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <CheckCircle className="w-8 h-8 text-available mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.availableBooks.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Clock className="w-8 h-8 text-on-loan mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.onLoan}</div>
            <div className="text-sm text-muted-foreground">On Loan</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <AlertCircle className="w-8 h-8 text-overdue mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.overdueBooks}</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.newBooks}</div>
            <div className="text-sm text-muted-foreground">New This Month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Popular Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookMarked className="w-5 h-5 text-primary" />
              <span>Popular Books</span>
            </CardTitle>
            <CardDescription>Most borrowed books this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {book.loans} loans
                    </Badge>
                    <Badge 
                      variant={book.available > 0 ? "default" : "destructive"} 
                      className="text-xs"
                    >
                      {book.available} available
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/books">View All Books</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest borrowing and returning activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.action === 'borrowed' ? 'bg-on-loan text-on-loan-foreground' : 'bg-available text-available-foreground'
                }`}>
                  {activity.action === 'borrowed' ? 
                    <ScanLine className="w-4 h-4" /> : 
                    <RotateCcw className="w-4 h-4" />
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <span className="font-semibold">{activity.user}</span> {activity.action} <span className="italic">"{activity.book}"</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/history">View My History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Everything you need to manage your library experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-3">
              <Link to="/borrow">
                <ScanLine className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Borrow Book</div>
                  <div className="text-xs text-muted-foreground">Scan ISBN or search</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-3">
              <Link to="/return">
                <RotateCcw className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Return Book</div>
                  <div className="text-xs text-muted-foreground">Quick return process</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-3">
              <Link to="/history">
                <History className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <div className="font-medium">My History</div>
                  <div className="text-xs text-muted-foreground">Track your loans</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-3">
              <Link to="/books">
                <BookOpen className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Browse Books</div>
                  <div className="text-xs text-muted-foreground">Explore catalog</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;