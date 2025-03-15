gmail-toolkit/
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── prisma/                   # Prisma database files
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── public/                   # Static assets
│   └── images/               # Image assets
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── api/                  # API routes
│   │   ├── auth/             # Auth API
│   │   ├── gmail/            # Gmail API
│   │   └── payments/         # Stripe payment API
│   ├── dashboard/            # Dashboard page
│   │   └── page.tsx
│   ├── inbox/                # Inbox page
│   │   └── page.tsx
│   ├── drafts/               # Drafts page
│   │   └── page.tsx
│   ├── composer/             # Email composer
│   │   └── page.tsx
│   └── scheduler/            # Email scheduler
│       └── page.tsx
├── components/               # Reusable components
│   ├── ui/                   # ShadCN components
│   ├── email/                # Email-specific components
│   ├── layout/               # Layout components
│   └── forms/                # Form components
├── lib/                      # Shared utilities
│   ├── prisma.ts             # Prisma client
│   ├── gmail.ts              # Gmail API utils
│   ├── auth.ts               # Auth utils
│   └── stripe.ts             # Stripe utils
└── types/                    # TypeScript type definitions
    └── index.ts              # Global type definitions
