# Gmail Toolkit - Simple Demo

A simplified demo version of the Gmail toolkit that doesn't require a database. This version uses in-memory data storage instead of Prisma and PostgreSQL.

## Features

- Dashboard with overview stats
- Inbox viewer with mock emails
- Drafts management
- Scheduled emails
- Sent emails history
- Simple UI built with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18 or later

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/gmail-toolkit-simple.git
   cd gmail-toolkit-simple
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Structure

- `app/`: Next.js 14 App Router files
- `components/`: Reusable UI components
- `lib/`: Utility functions and data storage
  - `data.ts`: In-memory data store with mock emails, drafts, etc.

## Deployment

This simplified version can be deployed to any static hosting platform:

### Deploying to Render

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)

2. In Render dashboard, create a new Web Service:
   - Connect your repository
   - Select "Node" as environment
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. Click "Create Web Service"

## Notes

This is a simplified demo version that doesn't include:
- Authentication
- Database storage
- Gmail API integration
- Stripe payments

For the full version with all features, see the complete Gmail toolkit repository.
