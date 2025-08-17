# Vercel Deployment Guide

## Project Structure for Vercel

Your Vite web app is now configured for Vercel deployment with the following structure:

```
├── api/                    # Vercel API routes (serverless functions)
│   └── index.js           # Main API handler
├── client/                # React frontend source
├── dist/spa/              # Build output (auto-generated)
├── server/                # Express server logic
├── vercel.json            # Vercel configuration
├── .vercelignore          # Files to ignore during deployment
└── package.json           # Updated build scripts
```

## Key Configuration Files

### `vercel.json`
- Configures build settings for Vercel
- Sets up API routes and client-side routing
- Handles SPA routing with fallback to index.html

### `api/index.js`
- Serverless function entry point
- Imports and exports your Express server
- Automatically handles API requests

## Deployment Steps

### 1. Install Vercel CLI (optional)
```bash
npm i -g vercel
```

### 2. Deploy via CLI
```bash
vercel --prod
```

### 3. Deploy via Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository in Vercel dashboard
3. Auto-deploy on every push to main branch

## Environment Variables

Set environment variables in Vercel dashboard:
- `NODE_ENV=production`
- Add any custom environment variables your app needs

## Build Configuration

The app uses these npm scripts:
- `npm run build` - Builds the client for production
- `npm run vercel-build` - Vercel-specific build command
- `npm run dev` - Development server

## API Routes

API endpoints are accessible at:
- Production: `https://yourapp.vercel.app/api/*`
- Development: `http://localhost:8080/api/*`

## Performance Optimizations

- Automatic code splitting by vendor and router chunks
- Static asset optimization
- CDN delivery via Vercel Edge Network
- Serverless function cold start optimization

## Troubleshooting

If you encounter issues:
1. Check Vercel function logs in dashboard
2. Ensure all dependencies are in `package.json`
3. Verify API routes work locally first
4. Check build logs for any errors

## Migration from Netlify

The app was previously configured for Netlify. Key changes made:
- Replaced `netlify.toml` with `vercel.json`
- Moved API functions from `netlify/functions/` to `api/`
- Updated build scripts for Vercel compatibility
