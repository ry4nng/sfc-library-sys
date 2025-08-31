import React, { useState } from 'react';
import { Book, Copy } from '@/types/library';
import { mockBooks, mockCopies } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Search, BookOpen, Edit, Copy as CopyIcon, FileUp } from 'lucide-react';

const AdminBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [copies, setCopies] = useState<Copy[]>(mockCopies);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    courseTag: '',
    totalCopies: 1
  });

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery) ||
    (book.courseTag && book.courseTag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getAvailableCopies = (bookId: string): number => {
    return copies.filter(copy => 
      copy.bookId === bookId && copy.status === 'AVAILABLE'
    ).length;
  };

  const getOnLoanCopies = (bookId: string): number => {
    return copies.filter(copy => 
      copy.bookId === bookId && copy.status === 'ON_LOAN'
    ).length;
  };

  const handleAddBook = () => {
    if (!newBook.isbn || !newBook.title || !newBook.author) {
      toast.error('Please fill in all required fields');
      return;
    }

    const bookId = String(books.length + 1);
    const book: Book = {
      id: bookId,
      isbn: newBook.isbn,
      title: newBook.title,
      author: newBook.author,
      courseTag: newBook.courseTag || undefined,
      coverUrl: '/api/placeholder/150/200',
      totalCopies: newBook.totalCopies,
      active: true
    };

    // Create copies for the book
    const newCopies: Copy[] = [];
    for (let i = 1; i <= newBook.totalCopies; i++) {
      newCopies.push({
        id: String(copies.length + i),
        bookId: bookId,
        inventoryCode: `${newBook.courseTag?.substring(0, 4).toUpperCase() || 'BOOK'}${String(i).padStart(3, '0')}`,
        status: 'AVAILABLE',
        shelfLocation: 'A1-01'
      });
    }

    setBooks(prev => [...prev, book]);
    setCopies(prev => [...prev, ...newCopies]);
    setNewBook({ isbn: '', title: '', author: '', courseTag: '', totalCopies: 1 });
    setIsAddDialogOpen(false);
    toast.success('Book added successfully');
  };

  const handleDeleteBook = (bookId: string) => {
    const bookTitle = books.find(b => b.id === bookId)?.title;
    const onLoanCount = getOnLoanCopies(bookId);
    
    if (onLoanCount > 0) {
      toast.error('Cannot delete book with copies currently on loan');
      return;
    }

    setBooks(prev => prev.filter(book => book.id !== bookId));
    setCopies(prev => prev.filter(copy => copy.bookId !== bookId));
    toast.success(`"${bookTitle}" deleted successfully`);
  };

  const handleAddCopy = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const copyCount = copies.filter(c => c.bookId === bookId).length + 1;
    const newCopy: Copy = {
      id: String(copies.length + 1),
      bookId: bookId,
      inventoryCode: `${book.courseTag?.substring(0, 4).toUpperCase() || 'BOOK'}${String(copyCount).padStart(3, '0')}`,
      status: 'AVAILABLE',
      shelfLocation: 'A1-01'
    };

    setCopies(prev => [...prev, newCopy]);
    setBooks(prev => prev.map(b => 
      b.id === bookId 
        ? { ...b, totalCopies: b.totalCopies + 1 }
        : b
    ));
    toast.success('Copy added successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Manage Books</h1>
            <p className="text-muted-foreground">
              Add, edit, and manage the library book collection
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileUp className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new book and specify how many copies to create.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN *</Label>
                    <Input
                      id="isbn"
                      placeholder="9780123456789"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook(prev => ({ ...prev, isbn: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Book title"
                      value={newBook.title}
                      onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      placeholder="Author name"
                      value={newBook.author}
                      onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseTag">Course Tag</Label>
                    <Input
                      id="courseTag"
                      placeholder="e.g., Mathematics, Physics"
                      value={newBook.courseTag}
                      onChange={(e) => setNewBook(prev => ({ ...prev, courseTag: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalCopies">Number of Copies</Label>
                    <Input
                      id="totalCopies"
                      type="number"
                      min="1"
                      value={newBook.totalCopies}
                      onChange={(e) => setNewBook(prev => ({ ...prev, totalCopies: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBook}>
                    Add Book
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search books by title, author, ISBN, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>Books ({filteredBooks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Details</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Copies</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map(book => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{book.title}</div>
                        <div className="text-sm text-muted-foreground">by {book.author}</div>
                        <div className="text-xs text-muted-foreground">ISBN: {book.isbn}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {book.courseTag ? (
                        <Badge variant="outline">{book.courseTag}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{book.totalCopies} total</div>
                        <div className="text-xs text-muted-foreground">
                          {getAvailableCopies(book.id)} available, {getOnLoanCopies(book.id)} on loan
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {book.active ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddCopy(book.id)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{book.title}"? This action cannot be undone.
                                {getOnLoanCopies(book.id) > 0 && (
                                  <div className="mt-2 p-2 bg-destructive/10 rounded text-destructive text-sm">
                                    Warning: This book has {getOnLoanCopies(book.id)} copies currently on loan.
                                  </div>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteBook(book.id)}
                                disabled={getOnLoanCopies(book.id) > 0}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No books found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first book'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBooks;