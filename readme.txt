# Gmail Toolkit

A modern Gmail toolkit built with Next.js 14, Typescript, Tailwind CSS, and the Gmail API to help you manage your inbox, draft emails, schedule campaigns, and send personalized messages.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Component library built on Tailwind
- **Prisma** - ORM for database access
- **PostgreSQL** - SQL database
- **NextAuth.js** - Authentication
- **Gmail API** - Email functionality
- **Stripe** - Payment processing

## Features

- **Inbox Management** - View and organize your emails
- **Email Composer** - Create and save drafts
- **Templates** - Create reusable email templates
- **Scheduler** - Schedule emails to be sent later
- **Bulk Sender** - Send personalized emails to multiple recipients
- **AI Assist** - Get help writing emails (via client templates)
- **Gmail Integration** - Seamless integration with Gmail

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- Google OAuth credentials
- Stripe account (for payments)

### Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

### Installation

```bash
# Install dependencies
npm install

# Setup the database
npx prisma migrate dev

# Start the development server
npm run dev
```

### Google API Setup

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Gmail API
3. Create OAuth credentials with the following scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/gmail.compose`
   - `https://www.googleapis.com/auth/gmail.modify`
4. Add your credentials to the `.env.local` file

## Project Structure

```
gmail-toolkit/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── composer/         # Email composer
│   ├── dashboard/        # Dashboard
│   ├── drafts/           # Draft management
│   ├── inbox/            # Inbox view
│   └── scheduler/        # Email scheduler
├── components/           # Reusable components
├── lib/                  # Utility functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## License

MIT
