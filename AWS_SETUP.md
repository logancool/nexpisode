# AWS Setup Instructions

## 1. Create AWS Cognito User Pool

1. Go to AWS Console → Cognito → User Pools
2. Create a new User Pool named "nexpisode-users"
3. Configure sign-in options: Email
4. Configure security requirements: Default
5. Configure sign-up experience: Default
6. Configure message delivery: Default
7. Integrate your app:
   - App client name: "nexpisode-client"
   - Generate client secret: NO
   - Authentication flows: ALLOW_USER_SRP_AUTH
8. Review and create

## 2. Configure Google OAuth

1. In your User Pool → Sign-in experience → Federated identity provider sign-in
2. Add identity provider → Google
3. Get Google OAuth credentials:
   - Go to Google Cloud Console
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-domain.auth.region.amazoncognito.com/oauth2/idpresponse`
4. Enter Google Client ID and Client Secret in Cognito

## 3. Create Identity Pool

1. Go to Cognito → Identity Pools
2. Create new identity pool "nexpisode-identity"
3. Enable unauthenticated access: NO
4. Authentication providers → Cognito
5. Enter your User Pool ID and App Client ID

## 4. Create DynamoDB Table

1. Go to DynamoDB → Tables → Create table
2. Table name: "nexpisode-user-shows"
3. Partition key: "userId" (String)
4. Sort key: "showId" (String)
5. Use default settings

## 5. Create API Gateway (Optional - for advanced features)

1. Go to API Gateway → Create API → REST API
2. API name: "nexpisode-api"
3. Create resources and methods for CRUD operations
4. Deploy to stage

## 6. Update Environment Variables

Replace the placeholder values in `.env` with your actual AWS resource IDs:

```
REACT_APP_USER_POOL_ID=us-east-1_xxxxxxxxx
REACT_APP_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_OAUTH_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
REACT_APP_S3_BUCKET=your-bucket-name
REACT_APP_AWS_REGION=us-east-1
```

## Free Tier Limits

- Cognito: 50,000 MAUs free
- DynamoDB: 25GB storage, 25 read/write capacity units
- API Gateway: 1M API calls per month
- S3: 5GB storage, 20,000 GET requests

All these services should stay within AWS free tier for a personal project.