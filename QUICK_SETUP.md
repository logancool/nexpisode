# Quick AWS Setup

## Option 1: Amplify CLI (Recommended)
```bash
# Make script executable and run
chmod +x amplify-setup.sh
./amplify-setup.sh
```

## Option 2: Manual AWS Console
1. Go to AWS Amplify Console
2. Click "New app" → "Build an app"
3. Connect your GitHub repo
4. Add Authentication → Social sign-in → Google
5. Add Storage → DynamoDB

## Option 3: Skip AWS for now
Comment out AWS imports in App.js to test locally:

```javascript
// import { Amplify } from 'aws-amplify';
// import amplifyConfig from './amplify-config';
// Amplify.configure(amplifyConfig);
```

Then the app will work without authentication but keep the retro styling.