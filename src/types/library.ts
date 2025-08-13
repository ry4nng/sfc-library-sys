// Core library system types

export type UserRole = 'student' | 'moderator' | 'librarian' | 'admin';

export type BookStatus = 'AVAILABLE' | 'ON_LOAN' | 'LOST';

export type LoanStatus = 'BORROWED' | 'RETURNED' | 'OVERDUE';

export type NotificationType = 'BORROW' | 'DUE_SOON' | 'OVERDUE';

export type SyncSource = 'ISAMS' | 'MAESTRO';

export interface User {
  id: string;
  email: string;
  name: string;
  formYear?: number;
  age?: number;
  role: UserRole;
  isamsId?: string;
  createdAt: Date;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  courseTag?: string;
  coverUrl?: string;
  totalCopies: number;
  active: boolean;
}

export interface Copy {
  id: string;
  bookId: string;
  inventoryCode: string;
  status: BookStatus;
  shelfLocation?: string;
  book?: Book;
}

export interface Loan {
  id: string;
  userId: string;
  copyId: string;
  borrowedAt: Date;
  dueAt: Date;
  returnedAt?: Date;
  status: LoanStatus;
  lateFeeCents?: number;
  notes?: string;
  user?: User;
  copy?: Copy;
}

export interface Notification {
  id: string;
  userId: string;
  loanId?: string;
  type: NotificationType;
  scheduledFor: Date;
  sentAt?: Date;
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface ExternalHolding {
  id: string;
  ownerUserId: string;
  bookId: string;
  visibility: 'ORG' | 'PRIVATE';
}

export interface SyncPointer {
  id: string;
  source: SyncSource;
  cursor: string;
  lastRunAt: Date;
}

export interface AuditLog {
  id: string;
  actorUserId?: string;
  action: string;
  entity: string;
  entityId: string;
  dataJson: Record<string, any>;
  createdAt: Date;
}

// Environment configuration types
export interface LibraryConfig {
  LATE_FEE_ENABLED: boolean;
  DAILY_LATE_FEE_CENTS: number;
  DEFAULT_LOAN_DAYS: number;
  MAX_LOANS_PER_USER: number;
  BLOCK_AT_OVERDUE_COUNT: number;
  REVIEWS_ENABLED: boolean;
  P2P_LENDING_ENABLED: boolean;
  RECOMMENDATIONS_ENABLED: boolean;
}

// ISAMS Integration types
export interface ISAMSConfig {
  mode: 'api' | 'sftp';
  apiUrl?: string;
  apiKey?: string;
  sftpHost?: string;
  sftpUser?: string;
  sftpKeyPath?: string;
  syncScheduleCron: string;
}

export interface ISAMSStudent {
  StudentId: string;
  GivenName: string;
  Surname: string;
  Email: string;
  FormYear: number;
  Status: string;
}