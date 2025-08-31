import React, { useState } from 'react';
import { Book, Copy, BookStatus } from '@/types/library';
import { mockBooks, mockCopies } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, Users } from 'lucide-react';

const BrowseBooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [books] = useState<Book[]>(mockBooks);
  const [copies] = useState<Copy[]>(mockCopies);

  // Get unique course tags
  const courseOptions = ['all', ...new Set(books.map(book => book.courseTag).filter(Boolean))];

  // Filter books based on search and course
  const filteredBooks = books.filter(book => {
    if (!book.active) return false;
    
    const matchesSearch = !searchQuery || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      (book.courseTag && book.courseTag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCourse = selectedCourse === 'all' || book.courseTag === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  // Get available copies count for a book
  const getAvailableCopies = (bookId: string): number => {
    return copies.filter(copy => 
      copy.bookId === bookId && copy.status === 'AVAILABLE'
    ).length;
  };

  // Get copy status badge
  const getStatusBadge = (bookId: string) => {
    const available = getAvailableCopies(bookId);
    const total = copies.filter(copy => copy.bookId === bookId).length;
    
    if (available === 0) {
      return <Badge variant="destructive">All On Loan</Badge>;
    } else if (available === total) {
      return <Badge variant="default">All Available</Badge>;
    } else {
      return <Badge variant="secondary">{available}/{total} Available</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Books</h1>
          <p className="text-muted-foreground">
            Explore our collection of academic resources and textbooks
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title, author, ISBN, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courseOptions.slice(1).map(course => (
                <SelectItem key={course} value={course!}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-[3/4] bg-muted rounded-md mb-3 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {book.courseTag && (
                    <Badge variant="outline" className="text-xs">
                      {book.courseTag}
                    </Badge>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{book.totalCopies} total copies</span>
                  </div>

                  {getStatusBadge(book.id)}

                  <div className="text-xs text-muted-foreground">
                    ISBN: {book.isbn}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    disabled={getAvailableCopies(book.id) === 0}
                  >
                    {getAvailableCopies(book.id) > 0 ? 'View Details' : 'Not Available'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all courses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;