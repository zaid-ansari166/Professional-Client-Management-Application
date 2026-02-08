# ClientHub - Professional Client Management Application

A full-stack web application for managing client profiles, professional templates, and generating combined summaries. Built as part of a developer assessment demonstrating clean code architecture, data modeling, and modern web development practices.

## 🚀 Live Demo

Once deployed, the application provides:
- User authentication (sign up/sign in)
- Personal template management
- Client record management
- Combined summary generation

## 📋 Features

### 1. User Authentication
- Sign up with email and password
- Secure login with NextAuth.js
- JWT-based session management
- Protected routes with middleware

### 2. Profile Template
- Create a personal template with:
  - Specialization (e.g., Full-Stack Developer)
  - Work style (Remote, Hybrid, On-site)
  - Default sections for projects
- One template per user
- Edit template anytime

### 3. Client Management
- Create multiple client records with:
  - Client name
  - Project summary
  - Goals and objectives
- View list of all clients
- Edit or delete client records
- Detailed client view

### 4. Summary Generation
- Combine template + client data
- Structured, professional format
- Ready for presentation or documentation

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Tailwind

### Backend
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js with Credentials provider
- **Validation**: Zod schemas

### Database
- **Database**: SQLite
- **ORM**: Prisma
- **Schema**: User, Template, Client models

### Security
- **Password Hashing**: bcrypt (10 salt rounds)
- **Session**: JWT tokens (30-day expiry)
- **Route Protection**: Next.js middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd internshala-assignment
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

To generate a secure secret:
```bash
openssl rand -base64 32
```

### Step 4: Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Create database and tables
npm run db:push
```

### Step 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### First Time Setup
1. Navigate to the homepage
2. Click "Get Started" or "Sign Up"
3. Create an account with email and password
4. You'll be redirected to the dashboard

### Creating Your Template
1. Click "Template" in the navigation
2. Fill in your specialization (e.g., "Full-Stack Developer")
3. Select your work style (Remote, Hybrid, or On-site)
4. Add default sections for your projects
5. Click "Create Template"

### Adding Clients
1. Click "Clients" in the navigation
2. Click "New Client" button
3. Enter client name, project summary, and goals
4. Click "Create Client"

### Viewing Summaries
1. From the clients list, click "View Summary" on any client
2. See a professional document combining:
   - Your template information
   - Client-specific details
3. Use "Edit Client" to make changes if needed

## 🏗 Architecture Decisions

### Why Next.js with App Router?
- Server and client components for optimal performance
- Built-in API routes eliminate need for separate backend
- File-based routing simplifies navigation
- Easy deployment to Vercel

### Why SQLite?
- Zero configuration required
- Perfect for local development and assessment
- Easy to share (single file database)
- **Trade-off**: Not suitable for production with high concurrency
- **Production Alternative**: PostgreSQL or MySQL

### Why NextAuth.js?
- Industry-standard authentication library
- Well-documented and maintained
- Handles JWT sessions automatically
- Extensible for OAuth providers if needed

### Why Prisma?
- Type-safe database queries
- Automatic TypeScript types
- Easy migrations and schema management
- Great developer experience

### Data Modeling
```
User (1) ──┬── Template (1)
           └── Client (many)
```

- **One-to-One**: User ↔ Template (each user has exactly one template)
- **One-to-Many**: User ↔ Clients (each user can have multiple clients)
- **Cascade Deletion**: Deleting a user removes their template and clients

## 📁 Project Structure

```
internshala-assignment/
├── app/                        # Next.js App Router
│   ├── api/                    # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── template/           # Template CRUD
│   │   ├── clients/            # Client CRUD
│   │   └── summary/            # Summary endpoint
│   ├── auth/                   # Auth pages (signin, signup)
│   ├── dashboard/              # Dashboard page
│   ├── template/               # Template page
│   ├── clients/                # Client pages
│   ├── summary/                # Summary pages
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/                 # React components
│   ├── ui/                     # Base UI components
│   ├── auth/                   # Auth forms
│   ├── template/               # Template components
│   ├── clients/                # Client components
│   ├── summary/                # Summary components
│   └── layout/                 # Layout components
├── lib/                        # Utilities
│   ├── db.ts                   # Prisma client
│   ├── auth.ts                 # NextAuth config
│   └── validations.ts          # Zod schemas
├── types/                      # TypeScript types
├── prisma/                     # Database
│   └── schema.prisma           # Database schema
├── middleware.ts               # Route protection
└── package.json                # Dependencies
```

## 🧪 Testing the Application

### Manual Testing Checklist
- [ ] Sign up with new account
- [ ] Sign in with existing account
- [ ] Sign out
- [ ] Create template
- [ ] Edit template
- [ ] Create multiple clients
- [ ] View client list
- [ ] Edit client
- [ ] Delete client
- [ ] View summary for each client
- [ ] Try accessing protected routes while logged out

### API Endpoints
```
POST   /api/auth/signup          Create new user
POST   /api/auth/signin          Sign in (NextAuth)
GET    /api/template             Get user template
POST   /api/template             Create template
PUT    /api/template             Update template
GET    /api/clients              List all clients
POST   /api/clients              Create client
GET    /api/clients/[id]         Get specific client
PUT    /api/clients/[id]         Update client
DELETE /api/clients/[id]         Delete client
GET    /api/summary/[clientId]   Get combined data
```

## 🔒 Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (10 rounds)
   - Never stored in plain text

2. **Authentication**
   - JWT-based sessions
   - Secure HTTP-only cookies
   - 30-day session expiry

3. **Authorization**
   - Middleware protects all routes
   - User can only access their own data
   - Database queries filtered by userId

4. **Validation**
   - Client-side form validation
   - Server-side Zod schema validation
   - Type-safe API responses

## 🚧 What Would Be Improved With More Time

### 1. Email Verification
Currently, users can sign up with any email address without verification. In production:
- Send verification email on signup
- Verify email before allowing full access
- Add email change functionality

### 2. Password Reset
Users cannot reset forgotten passwords. Would add:
- "Forgot Password" link on signin page
- Email-based password reset flow
- Temporary reset tokens with expiration

### 3. Enhanced Search & Filtering
The client list could benefit from:
- Search by client name or project
- Filter by date created
- Sort options (name, date, etc.)
- Pagination for large lists

### 4. Rich Text Editor
Replace plain textareas with a rich text editor (Tiptap) for:
- Better formatting in project summaries
- Markdown support
- Easier content creation

### 5. Export Functionality
Add ability to:
- Export summaries as PDF
- Download client data as CSV
- Print-friendly summary views

### 6. Testing
Add comprehensive test coverage:
- Unit tests for utility functions
- Integration tests for API routes
- E2E tests with Playwright
- Component tests with React Testing Library

### 7. Deployment Optimizations
- Move to PostgreSQL for production
- Add Redis for session storage
- Implement rate limiting
- Add monitoring and error tracking
- Setup CI/CD pipeline

### 8. UX Enhancements
- Dark mode toggle
- Toast notifications for actions
- Skeleton loaders
- Optimistic UI updates
- Better mobile responsiveness

## 📝 Development Notes

### Time Spent
Approximately 3 hours on core implementation:
- Project setup and configuration: 20 min
- Authentication system: 40 min
- UI components: 25 min
- Template feature: 25 min
- Client management: 45 min
- Summary page: 20 min
- Documentation: 25 min

### Key Decisions
1. **SQLite over PostgreSQL**: Simplicity for assessment, easy to run locally
2. **NextAuth over custom auth**: Industry standard, well-tested, saves time
3. **Prisma over raw SQL**: Type safety and better developer experience
4. **Tailwind over CSS-in-JS**: Faster development, smaller bundle size
5. **Server components by default**: Better performance, SEO-friendly

### Challenges Faced
1. **NextAuth type extensions**: Had to extend Session and JWT types
2. **Async params in Next.js 14**: Used React `use()` hook for params
3. **Route protection**: Middleware configuration for multiple routes
4. **Form state management**: Kept it simple with useState

## 🤝 Contributing

This is an assessment project, but suggestions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for assessment purposes.

## 👤 Author

**Zaid Ansari**
- GitHub: [@zaid-ansari166](https://github.com/zaid-ansari166)
- Repository: [Professional-Client-Management-Application](https://github.com/zaid-ansari166/Professional-Client-Management-Application)

Created as part of Internshala developer assessment.

---

**Note**: This application is designed for demonstration purposes and should not be used in production without additional security hardening and scalability improvements.
