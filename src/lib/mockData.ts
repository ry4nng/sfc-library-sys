import { User, Book, Copy, Loan, UserRole, BookStatus, LoanStatus } from '@/types/library';

// Mock users with KTJ theme
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.smith@student.ktj.edu',
    name: 'John Smith',
    formYear: 12,
    age: 17,
    role: 'student' as UserRole,
    isamsId: 'STU001',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '2',
    email: 'emma.wilson@student.ktj.edu',
    name: 'Emma Wilson',
    formYear: 13,
    age: 18,
    role: 'student' as UserRole,
    isamsId: 'STU002',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    email: 'librarian@ktj.edu',
    name: 'Sarah Johnson',
    role: 'librarian' as UserRole,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '4',
    email: 'admin@ktj.edu',
    name: 'Michael Brown',
    role: 'admin' as UserRole,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '5',
    email: 'alex.chen@student.ktj.edu',
    name: 'Alex Chen',
    formYear: 12,
    age: 17,
    role: 'student' as UserRole,
    isamsId: 'STU003',
    createdAt: new Date('2024-01-10')
  }
];

// Mock books focused on Sixth Form subjects
export const mockBooks: Book[] = [
  {
    id: '1',
    isbn: '9780521618748',
    title: 'Advanced Mathematics for Cambridge International AS & A Level',
    author: 'Hugh Neill, Douglas Quadling',
    courseTag: 'Mathematics',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 5,
    active: true
  },
  {
    id: '2',
    isbn: '9780198374664',
    title: 'Physics for the IB Diploma',
    author: 'John Allum, Christopher Talbot',
    courseTag: 'Physics',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 4,
    active: true
  },
  {
    id: '3',
    isbn: '9780435994457',
    title: 'Chemistry for the IB Diploma',
    author: 'Christopher Talbot',
    courseTag: 'Chemistry',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 3,
    active: true
  },
  {
    id: '4',
    isbn: '9780521618571',
    title: 'Biology for Cambridge International AS & A Level',
    author: 'Mary Jones, Richard Fosbery',
    courseTag: 'Biology',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 6,
    active: true
  },
  {
    id: '5',
    isbn: '9780435994488',
    title: 'English Literature for A Level',
    author: 'Adrian Barlow',
    courseTag: 'English Literature',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 8,
    active: true
  },
  {
    id: '6',
    isbn: '9780199129638',
    title: 'History for the IB Diploma: The Cold War',
    author: 'Allan Todd',
    courseTag: 'History',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 4,
    active: true
  },
  {
    id: '7',
    isbn: '9780521618625',
    title: 'Economics for Cambridge International AS & A Level',
    author: 'Colin Bamford, Susan Grant',
    courseTag: 'Economics',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 3,
    active: true
  },
  {
    id: '8',
    isbn: '9780435994495',
    title: 'Psychology for A Level',
    author: 'Jean-Marc Lawton',
    courseTag: 'Psychology',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 5,
    active: true
  },
  {
    id: '9',
    isbn: '9780521618632',
    title: 'Computer Science for Cambridge International AS & A Level',
    author: 'Sylvia Langfield, Dave Duddell',
    courseTag: 'Computer Science',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 4,
    active: true
  },
  {
    id: '10',
    isbn: '9780435994501',
    title: 'Business Studies for A Level',
    author: 'Ian Marcouse',
    courseTag: 'Business Studies',
    coverUrl: '/api/placeholder/150/200',
    totalCopies: 6,
    active: true
  }
];

// Mock copies for the books
export const mockCopies: Copy[] = [
  { id: '1', bookId: '1', inventoryCode: 'MATH001', status: 'AVAILABLE' as BookStatus, shelfLocation: 'A1-01' },
  { id: '2', bookId: '1', inventoryCode: 'MATH002', status: 'ON_LOAN' as BookStatus, shelfLocation: 'A1-01' },
  { id: '3', bookId: '1', inventoryCode: 'MATH003', status: 'AVAILABLE' as BookStatus, shelfLocation: 'A1-01' },
  { id: '4', bookId: '2', inventoryCode: 'PHYS001', status: 'ON_LOAN' as BookStatus, shelfLocation: 'B2-03' },
  { id: '5', bookId: '2', inventoryCode: 'PHYS002', status: 'AVAILABLE' as BookStatus, shelfLocation: 'B2-03' },
  { id: '6', bookId: '3', inventoryCode: 'CHEM001', status: 'AVAILABLE' as BookStatus, shelfLocation: 'B2-05' },
  { id: '7', bookId: '4', inventoryCode: 'BIOL001', status: 'OVERDUE' as BookStatus, shelfLocation: 'B3-02' },
  { id: '8', bookId: '5', inventoryCode: 'ENG001', status: 'AVAILABLE' as BookStatus, shelfLocation: 'C1-01' },
  { id: '9', bookId: '5', inventoryCode: 'ENG002', status: 'ON_LOAN' as BookStatus, shelfLocation: 'C1-01' },
  { id: '10', bookId: '6', inventoryCode: 'HIST001', status: 'AVAILABLE' as BookStatus, shelfLocation: 'C2-04' }
];

// Mock loans with realistic sixth form scenarios
export const mockLoans: Loan[] = [
  {
    id: '1',
    userId: '1',
    copyId: '2',
    borrowedAt: new Date('2024-01-08'),
    dueAt: new Date('2024-01-22'),
    status: 'BORROWED' as LoanStatus,
    notes: 'For Mathematics A Level preparation'
  },
  {
    id: '2',
    userId: '2',
    copyId: '4',
    borrowedAt: new Date('2024-01-05'),
    dueAt: new Date('2024-01-19'),
    status: 'BORROWED' as LoanStatus,
    notes: 'Physics revision for mock exams'
  },
  {
    id: '3',
    userId: '5',
    copyId: '9',
    borrowedAt: new Date('2024-01-03'),
    dueAt: new Date('2024-01-17'),
    status: 'OVERDUE' as LoanStatus,
    lateFeeCents: 30,
    notes: 'English Literature coursework research'
  },
  {
    id: '4',
    userId: '1',
    copyId: '7',
    borrowedAt: new Date('2023-12-15'),
    dueAt: new Date('2023-12-29'),
    returnedAt: new Date('2024-01-02'),
    status: 'RETURNED' as LoanStatus,
    notes: 'Biology practical investigation reference'
  },
  {
    id: '5',
    userId: '2',
    copyId: '8',
    borrowedAt: new Date('2023-12-20'),
    dueAt: new Date('2024-01-03'),
    returnedAt: new Date('2024-01-02'),
    status: 'RETURNED' as LoanStatus,
    notes: 'English Literature essay writing'
  }
];

// Library configuration for KTJ SFC
export const libraryConfig = {
  LATE_FEE_ENABLED: false,
  DAILY_LATE_FEE_CENTS: 10,
  DEFAULT_LOAN_DAYS: 14,
  MAX_LOANS_PER_USER: 5,
  BLOCK_AT_OVERDUE_COUNT: 3,
  REVIEWS_ENABLED: false,
  P2P_LENDING_ENABLED: false,
  RECOMMENDATIONS_ENABLED: false
};

// Get current user (mock authentication)
export const getCurrentUser = (): User => {
  // In a real app, this would come from authentication context
  return mockUsers[2]; // librarian for demo purposes
};

// Helper functions for mock data
export const getBookById = (id: string): Book | undefined => {
  return mockBooks.find(book => book.id === id);
};

export const getCopyById = (id: string): Copy | undefined => {
  return mockCopies.find(copy => copy.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getLoansByUserId = (userId: string): Loan[] => {
  return mockLoans.filter(loan => loan.userId === userId);
};

export const getActiveLoansByCopyId = (copyId: string): Loan[] => {
  return mockLoans.filter(loan => 
    loan.copyId === copyId && 
    loan.status === 'BORROWED'
  );
};

// Statistics for dashboard
export const getLibraryStats = () => {
  const totalBooks = mockBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableCopies = mockCopies.filter(copy => copy.status === 'AVAILABLE').length;
  const activeBorrows = mockLoans.filter(loan => loan.status === 'BORROWED').length;
  const overdueLoans = mockLoans.filter(loan => loan.status === 'OVERDUE').length;
  const dueSoonLoans = mockLoans.filter(loan => {
    if (loan.status !== 'BORROWED') return false;
    const daysDiff = Math.ceil((loan.dueAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 2 && daysDiff >= 0;
  }).length;

  return {
    totalBooks,
    availableCopies,
    activeBorrows,
    overdueLoans,
    dueSoonLoans,
    totalUsers: mockUsers.filter(user => user.role === 'student').length
  };
};