# Deployment Instructions for Netlify

## Prerequisites
- A Netlify account
- Git repository with your Next.js project
- Environment variables from your local development setup

## Deployment Steps

### 1. Connect to Git Repository
1. Log in to your Netlify account
2. Click "Add new site" > "Import an existing project"
3. Connect to your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository

### 2. Configure Build Settings
Netlify should automatically detect Next.js and suggest appropriate build settings:
- Build command: `npm run build`
- Publish directory: `.next`

### 3. Set Up Environment Variables
1. Go to Site settings > Environment variables
2. Add all required environment variables from your local `.env.local` file
   - See `ENV_VARIABLES_REQUIRED.md` for the complete list
   - For `FIREBASE_PRIVATE_KEY`, make sure to properly format with quotes and newlines

### 4. Deploy
1. Click "Deploy site"
2. Wait for the build and deployment to complete

## Troubleshooting

### Build Fails with Missing Dependencies
If the build fails with missing dependencies:
1. Check the build logs
2. Make sure all dependencies are properly listed in `package.json`
3. Try a clean install by clicking "Clear cache and deploy site" in the Deploys tab

### Environment Variable Issues
If the site deploys but shows API errors:
1. Check that all environment variables are correctly set
2. Pay special attention to the `FIREBASE_PRIVATE_KEY` formatting
3. Ensure all Firebase and OpenAI credentials are valid

### Next.js Specific Issues
For Next.js specific deployment issues:
1. Make sure the Netlify Next.js plugin is properly installed
2. Check the `next.config.js` for proper configuration
3. Consult the [Netlify Next.js Plugin documentation](https://github.com/netlify/next-runtime) 