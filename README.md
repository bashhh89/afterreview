# AI Efficiency Scorecard

## Project Overview

The AI Efficiency Scorecard is an interactive assessment tool that helps organizations evaluate their AI maturity level and receive personalized recommendations.

## ⚠️ Important Setup Instructions ⚠️

This project has a nested directory structure. Make sure you are in the correct directory before running commands.

### Correct Directory Structure:

```
E:\final\             <- Root project folder (outer final)
└── final\            <- Actual Next.js application (inner final)
    ├── app\
    ├── components\
    ├── package.json  <- This is where the npm/pnpm scripts are defined
    └── ...
```

### Required Environment Variables

For the project to build and function correctly, you need to set up the following environment variables:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
   
# Email Notifications
RESEND_API_KEY=your_resend_api_key
LEAD_NOTIFICATION_EMAIL=your_notification_email@example.com
   
# Feature flags
ENABLE_FILE_UPLOAD=true
ENABLE_DETAILED_TIER_LOGS=true
```

When deploying to Vercel, make sure to add these environment variables in your project settings.

### Setup Steps:

1. Navigate to the inner "final" directory:
   ```bash
   cd final
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the project root with the variables listed above

4. Run the development server:
   ```bash
   pnpm run dev
   ```

5. The application will be available at:
   ```
   http://localhost:3000
   ```

## Key Features

- Industry-specific AI maturity assessment
- Comprehensive question flow across multiple phases
- AI-powered report generation
- Auto-complete testing functionality
- Collapsible Q&A history for result review

## Troubleshooting

### Vercel Build Issues

If you encounter the error "Module not found: Can't resolve 'resend'" during Vercel deployment:

1. Make sure the `resend` package is in your dependencies in package.json
2. Add the RESEND_API_KEY environment variable in your Vercel project settings

## Available Scripts

- `pnpm run dev` - Starts the development server
- `pnpm run build` - Builds the application for production
- `pnpm run start` - Runs the built application in production mode
- `pnpm run lint` - Runs ESLint to check for code quality issues

## Project Documents

- `project-overview.md` - Non-technical overview of the project
- `progress.md` - Detailed progress report with completed features and next steps

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
