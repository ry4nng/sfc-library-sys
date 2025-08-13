# SFC Digital Library System

A production-ready web-based library management system for the Sixth Form Committee (SFC) at KTJ. This system automates book borrowing and returns, tracks availability, sends email notifications, and provides comprehensive admin tools.

## 🏫 Overview

The SFC Digital Library System is designed specifically for sixth form students and staff, featuring:

- **Microsoft Entra ID (Azure AD) SSO** integration with school accounts
- **QR Code login** for quick access in the SFC area
- **Barcode/ISBN scanning** via camera or USB scanners
- **ISAMS integration** for student roster synchronization
- **Email notifications** via Microsoft Graph API
- **Mobile-first responsive design** with KTJ brand colors

## 🎨 Brand & Design

The system follows KTJ's visual identity:
- **Primary Colors**: Maroon (#7A1E1E) and Red (#C33B3B)
- **Pill-shaped buttons** with gradients and uppercase tracking
- **Clean academic aesthetic** with warm library imagery
- **Accessible design** meeting WCAG AA standards

## 🚀 Features

### MVP Features (Phase 1)
- ✅ **Authentication**: Microsoft SSO with QR code login
- ✅ **Book Management**: Scan ISBN, borrow/return workflow
- ✅ **Admin Dashboard**: Loans, books, users, audit logs
- ✅ **Email Notifications**: Borrow receipts, due reminders, overdue alerts
- ✅ **ISAMS Integration**: Student roster sync (API/SFTP modes)
- ✅ **Network Security**: School Wi-Fi IP allowlisting

### Phase 2 Features (Future)
- 🔄 **Recommendations**: Course-based and interest-based suggestions
- 🔄 **Reviews & Ratings**: Student book reviews
- 🔄 **Peer-to-Peer**: External holdings and lending requests
- 🔄 **Advanced Features**: Renewal flows, barcode printing

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Backend**: Node.js + Express (planned)
- **Database**: MySQL 8 with Prisma ORM (planned)
- **Authentication**: Microsoft Entra ID OAuth
- **Email**: Microsoft Graph API
- **Scanning**: zxing-js for camera + USB barcode support
- **Queue/Jobs**: BullMQ + Redis for background tasks

## 📊 Data Model

```typescript
// Core entities
User { id, email, name, formYear, age, role, isamsId }
Book { id, isbn, title, author, courseTag, coverUrl, totalCopies }
Copy { id, bookId, inventoryCode, status, shelfLocation }
Loan { id, userId, copyId, borrowedAt, dueAt, returnedAt, status }
Notification { id, userId, type, scheduledFor, sentAt }
AuditLog { id, actorUserId, action, entity, entityId, dataJson }
```

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- MySQL 8 (for production)
- Redis (for background jobs)
- Microsoft Azure AD application setup

### Development Setup

1. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd sfc-library-system
   npm install
   ```

2. **Environment configuration**:
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/sfc_library

# Authentication
NEXTAUTH_URL=https://library.sfc.local
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret

# Email
GRAPH_MAIL_FROM=noreply@school.edu

# Security
ALLOWED_CIDRS=10.0.0.0/8,192.168.0.0/16

# Library Configuration
LATE_FEE_ENABLED=false
DAILY_LATE_FEE_CENTS=10
DEFAULT_LOAN_DAYS=14
MAX_LOANS_PER_USER=5

# ISAMS Integration
ISAMS_SIS_MODE=api
ISAMS_API_URL=https://isams.school.edu/api
ISAMS_API_KEY=your-api-key
ISAMS_SYNC_SCHEDULE_CRON=0 3 * * *

# Background Jobs
REDIS_URL=redis://localhost:6379
```

## 🏗 Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   └── Layout.tsx      # App layout with navigation
├── pages/              # Route components
│   ├── Home.tsx        # Landing page with CTAs
│   ├── BorrowBook.tsx  # ISBN scanning and borrowing
│   ├── ReturnBook.tsx  # Book return workflow
│   ├── LoanHistory.tsx # User loan history
│   └── Admin*.tsx      # Admin dashboard pages
├── lib/                # Utilities and configuration
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

### Backend Architecture (Planned)
```
server/
├── controllers/        # Route handlers
├── services/          # Business logic
├── middleware/        # Auth, CORS, rate limiting
├── integrations/      # ISAMS, Graph API connectors
├── jobs/              # Background job definitions
└── database/          # Prisma schema and migrations
```

## 🔐 Security & Access Control

### Role-Based Access Control (RBAC)
- **Student**: Borrow/return books, view own history
- **Moderator**: Basic admin functions, help students
- **Librarian**: Full book management, loan overrides
- **Admin**: System configuration, user management, integrations

### Network Security
- **IP Allowlisting**: Configurable CIDR ranges for school network
- **Friendly Off-Campus Page**: Clear messaging when accessing from outside
- **Audit Logging**: All actions logged with actor and timestamp

## 📧 Email System

### Automated Notifications
- **Borrow Receipt**: Immediate confirmation with due date
- **Due Soon Reminders**: T-2 days before due date
- **Overdue Alerts**: T+1 day after due date
- **Calendar Integration**: Optional .ics attachments

### Templates
```
📚 Borrow Receipt
Subject: "Book borrowed: [Title]"
Content: Book details, due date, return instructions, library hours

⏰ Due Soon
Subject: "Your SFC Library book is due soon"
Content: Book details, due date, renewal options

⚠️ Overdue
Subject: "Overdue book: [Title]"
Content: Book details, days overdue, next steps (no payment in MVP)
```

## 🔗 ISAMS Integration

### Two Operation Modes

#### API Mode (Preferred)
- **Real-time sync** with ISAMS REST endpoints
- **Configurable schedule**: Default nightly at 3 AM
- **Idempotent upserts**: Safe to run multiple times
- **ETag caching**: Efficient bandwidth usage

#### SFTP Mode (Fallback)
- **CSV file ingestion** from ISAMS exports
- **File pattern**: `Students_*.csv`
- **Processed file tracking** via SyncPointer
- **Error resilience**: Continues on partial failures

### Admin Integration Dashboard
- Connection status and health checks
- Last sync timestamp and record counts
- Manual sync triggers and test connections
- Detailed logs and error reporting

## 📱 QR Code Setup

### Physical QR Code Instructions
1. **Generate QR Code**: Point to `https://library.sfc.local/login`
2. **Print Material**: Laminated poster for SFC area
3. **Placement**: Near library section, study areas
4. **Size Recommendation**: Minimum 5cm x 5cm for phone scanning

### QR Code Content
```
https://library.sfc.local/login
```

## 🚀 Deployment

### Docker Deployment (Recommended)
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://...
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8
    environment:
      MYSQL_DATABASE: sfc_library
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data

  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
```

### Production Checklist
- [ ] SSL certificates configured
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] ISAMS integration tested
- [ ] Email templates configured
- [ ] QR codes printed and placed
- [ ] Staff training completed

## 🧪 Testing

### Test Coverage
- **Authentication flows**: SSO success/failure scenarios
- **Barcode scanning**: Camera and USB scanner integration
- **Email scheduling**: Overdue job accuracy
- **RBAC enforcement**: Role-based page access
- **Network security**: IP allowlist functionality

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

## 📋 Admin Guide

### Daily Operations
1. **Monitor Dashboard**: Check overdue items and system health
2. **Process Returns**: Handle in-person returns and late fees
3. **Manage Inventory**: Add new books, update copy status
4. **Review Loans**: Extend due dates, waive fees as needed

### Weekly Tasks
1. **ISAMS Sync Review**: Verify student roster updates
2. **Inventory Audit**: Check for missing or damaged books
3. **Email Template Updates**: Seasonal messaging updates

### Troubleshooting
- **ISAMS Connection Issues**: Check network, credentials, API status
- **Email Failures**: Verify Graph API permissions and token validity
- **Scanner Problems**: Test camera permissions, USB device recognition

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and formatting
4. Submit pull request with description

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks

## 📈 Future Roadmap

### Phase 2 Features
- **Smart Recommendations**: ML-based book suggestions
- **Student Reviews**: Rating and review system
- **Peer-to-Peer**: External holdings marketplace
- **Mobile App**: Native iOS/Android applications

### Nice-to-Have Features
- **Barcode Label Printing**: Generate inventory labels
- **Self-Checkout Kiosk**: Unattended borrowing stations
- **SMS Notifications**: Alternative to email alerts
- **Advanced Analytics**: Usage patterns and insights

## 📞 Support

For technical support or questions:
- **Email**: library.support@ktj.edu
- **Internal**: Contact SFC Committee
- **Documentation**: This README and inline comments

---

**Built with ❤️ for the KTJ Sixth Form Committee**