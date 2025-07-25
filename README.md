# Nexpisode - TV Show Episode Tracker

A retro-styled web app for tracking when your favorite TV shows air next episodes. Features Google authentication and personal show lists.

## Features

- 🕰️ **Episode Countdown** - See exactly when the next episode airs
- 🔍 **TVDB Search** - Search and add any TV show from TheTVDB
- 👤 **Google Sign-in** - Secure authentication with Google
- 📝 **Personal Lists** - Save and manage your favorite shows
- 🎨 **Retro Design** - Clean, Craigslist-inspired interface

## Prerequisites

- Node.js (v16 or higher)
- yarn or npm

## Available Scripts

### `yarn start` or `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.

### `yarn deploy` or `npm run deploy`

Deploys to GitHub Pages (if configured).

## Environment Variables

Create a `.env` file with:
```
# TVDB API (required)
REACT_APP_TVDB_API_KEY=your-tvdb-api-key
REACT_APP_TVDB_API_PIN=your-tvdb-pin

# AWS (optional - for real Google OAuth)
REACT_APP_USER_POOL_ID=your-user-pool-id
REACT_APP_USER_POOL_CLIENT_ID=your-client-id
REACT_APP_AWS_REGION=us-east-1
```

## Quick Start

1. **Install**: `yarn install`
2. **Start**: `yarn start`
3. **Sign in**: Click "Sign in with Google" (mock auth for testing)
4. **Add shows**: Search TVDB and add to your list

## Deployment Options

### GitHub Pages (Free)
```bash
yarn build
yarn deploy
```

### Netlify (Free)
1. Connect your GitHub repo to Netlify
2. Build command: `yarn build`
3. Publish directory: `build`

### Vercel (Free)
```bash
npm i -g vercel
vercel
```

### AWS Amplify (Free Tier)
1. Go to AWS Amplify Console
2. Connect GitHub repo
3. Auto-deploys on push

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **AWS Amplify** - Authentication & storage
- **TVDB API** - TV show data
- **CSS** - Retro styling inspired by Craigslist

## Contributing

1. Fork the repo
2. Create feature branch
3. Make changes
4. Test locally
5. Submit PR