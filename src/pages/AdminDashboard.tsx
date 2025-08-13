import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock admin data
  const stats = {
    totalBooks: 1247,
    totalUsers: 342,
    activeLoans: 158,
    overdueLoans: 12,
    newUsersThisMonth: 23,
    popularBooks: 45,
    returnRate: 94.2,
    averageLoanDays: 11.5
  };

  const recentLoans = [
    { id: 1, user: "Sarah Johnson", book: "Introduction to Psychology", action: "borrowed", time: "2 hours ago", status: "active" },
    { id: 2, user: "Mike Chen", book: "Advanced Mathematics", action: "returned", time: "3 hours ago", status: "completed" },
    { id: 3, user: "Emma Wilson", book: "World History", action: "borrowed", time: "5 hours ago", status: "active" },
    { id: 4, user: "James Brown", book: "Organic Chemistry", action: "overdue", time: "2 days ago", status: "overdue" },
  ];

  const overdueBooks = [
    { id: 1, user: "James Brown", book: "Organic Chemistry", daysOverdue: 2, lateFee: 20 },
    { id: 2, user: "Lisa Davis", book: "Physics Principles", daysOverdue: 5, lateFee: 50 },
    { id: 3, user: "Tom Wilson", book: "Art History", daysOverdue: 1, lateFee: 10 },
  ];

  const bookInventory = [
    { id: 1, title: "Introduction to Psychology", author: "Dr. Sarah Smith", total: 5, available: 2, onLoan: 3, isbn: "9780134685991" },
    { id: 2, title: "Advanced Mathematics", author: "Prof. Michael Johnson", total: 4, available: 3, onLoan: 1, isbn: "9780321997159" },
    { id: 3, title: "World History", author: "Dr. Anna Wilson", total: 6, available: 4, onLoan: 2, isbn: "9780134543631" },
  ];

  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@school.edu", role: "student", activeLoans: 2, totalLoans: 15, joinDate: "2023-09-01" },
    { id: 2, name: "Mike Chen", email: "mike.c@school.edu", role: "student", activeLoans: 1, totalLoans: 8, joinDate: "2023-09-15" },
    { id: 3, name: "Emma Wilson", email: "emma.w@school.edu", role: "student", activeLoans: 3, totalLoans: 22, joinDate: "2023-08-20" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your library system and monitor activity.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.totalBooks}</div>
            <div className="text-xs text-muted-foreground">Total Books</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-on-loan mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.activeLoans}</div>
            <div className="text-xs text-muted-foreground">Active Loans</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-overdue mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.overdueLoans}</div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-available mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.newUsersThisMonth}</div>
            <div className="text-xs text-muted-foreground">New Users</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-available mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.returnRate}%</div>
            <div className="text-xs text-muted-foreground">Return Rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.averageLoanDays}</div>
            <div className="text-xs text-muted-foreground">Avg Loan Days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-xl font-bold text-foreground">{stats.popularBooks}</div>
            <div className="text-xs text-muted-foreground">Popular Books</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-fit grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest borrowing and returning activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentLoans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <p className="text-sm font-medium">{loan.user}</p>
                      <p className="text-xs text-muted-foreground">{loan.action} "{loan.book}"</p>
                      <p className="text-xs text-muted-foreground">{loan.time}</p>
                    </div>
                    <Badge variant={
                      loan.status === 'overdue' ? 'destructive' : 
                      loan.status === 'active' ? 'default' : 'secondary'
                    }>
                      {loan.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Overdue Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-overdue" />
                  <span>Overdue Books</span>
                </CardTitle>
                <CardDescription>Books that need immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {overdueBooks.map((overdue) => (
                  <div key={overdue.id} className="flex items-center justify-between p-3 rounded-lg bg-overdue/10 border border-overdue/20">
                    <div>
                      <p className="text-sm font-medium">{overdue.user}</p>
                      <p className="text-xs text-muted-foreground">"{overdue.book}"</p>
                      <p className="text-xs text-overdue font-medium">{overdue.daysOverdue} days overdue</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
                        ${(overdue.lateFee / 100).toFixed(2)}
                      </Badge>
                      <div className="flex space-x-1 mt-2">
                        <Button size="sm" variant="outline">Contact</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans Management</CardTitle>
              <CardDescription>Manage current book loans and handle returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLoans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">{loan.user}</p>
                      <p className="text-sm text-muted-foreground">"{loan.book}"</p>
                      <p className="text-xs text-muted-foreground">{loan.time}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={
                        loan.status === 'overdue' ? 'destructive' : 
                        loan.status === 'active' ? 'default' : 'secondary'
                      }>
                        {loan.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Book Inventory</CardTitle>
                  <CardDescription>Manage your book collection and copies</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Book
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookInventory.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                        <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="outline">Total: {book.total}</Badge>
                          <Badge variant="default" className="bg-available text-available-foreground">
                            Available: {book.available}
                          </Badge>
                          <Badge variant="secondary">On Loan: {book.onLoan}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage student and staff accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex space-x-2 mt-1">
                          <Badge variant="outline" className="capitalize">{user.role}</Badge>
                          <Badge variant="secondary">Active: {user.activeLoans}</Badge>
                          <Badge variant="outline">Total: {user.totalLoans}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>Generate and download various reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-2">Loan Activity Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">Detailed report of all loan activity for a specified period.</p>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-2">Overdue Books Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">List of all overdue books and associated late fees.</p>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-2">Inventory Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">Complete inventory status with availability counts.</p>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-2">User Activity Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">User engagement and borrowing patterns analysis.</p>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              System Settings
            </Button>
            <Link to="/admin/integrations">
              <Button variant="outline" className="h-20 flex-col w-full">
                <Database className="h-6 w-6 mb-2" />
                Integrations
              </Button>
            </Link>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              Export Data
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Add New Book
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;