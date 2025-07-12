# AWS Cognito Setup Guide for nexpisode

This guide will help you set up AWS Cognito authentication for your nexpisode React application.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Node.js and npm/yarn installed

## Step 1: Configure AWS CLI

If you haven't configured AWS CLI yet, run:

```bash
aws configure
```

You'll need:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (recommend: us-east-1)
- Default output format (recommend: json)

## Step 2: Run the Cognito Setup Script

Execute the setup script to create all necessary AWS resources:

```bash
./cognito-setup.sh
```

This script will create:
- Cognito User Pool for user authentication
- Cognito User Pool Client for your React app
- Cognito Identity Pool for AWS resource access
- DynamoDB table for storing user data
- IAM roles and policies for proper permissions

## Step 3: Update Environment Variables

After running the script, update your `.env` file with the output values:

```env
# TVDB API (existing)
REACT_APP_TVDB_API_HOST=https://api4.thetvdb.com
REACT_APP_TVDB_API_KEY=your-tvdb-key
REACT_APP_TVDB_API_PIN=your-tvdb-pin

# AWS Cognito Configuration
REACT_APP_USER_POOL_ID=us-east-1_xxxxxxxxx
REACT_APP_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_OAUTH_DOMAIN=your-user-pool-id.auth.us-east-1.amazoncognito.com
REACT_APP_S3_BUCKET=your-s3-bucket-name
REACT_APP_AWS_REGION=us-east-1
REACT_APP_REDIRECT_SIGN_IN=http://localhost:3000/
REACT_APP_REDIRECT_SIGN_OUT=http://localhost:3000/
```

## Step 4: Test the Application

1. Start your React application:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:3000`

3. You should see the login form. Try:
   - Creating a new account (sign up)
   - Confirming your email
   - Signing in with your credentials

## Features Included

### Authentication Components
- **LoginForm**: Handles sign up, sign in, and email confirmation
- **UserProfile**: Shows user information and logout functionality
- **useAuth Hook**: Provides authentication state and methods throughout your app

### AWS Resources Created
- **User Pool**: Manages user accounts and authentication
- **Identity Pool**: Provides AWS credentials for authenticated users
- **DynamoDB Table**: Stores user-specific data (shows, preferences, etc.)
- **IAM Roles**: Proper permissions for accessing AWS resources

## Usage in Your Components

### Using the Auth Hook

```javascript
import { useAuth } from './hooks/useAuth';

const MyComponent = () => {
  const { user, loading, login, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
};
```

### Protecting Routes

```javascript
import { useAuth } from './hooks/useAuth';

const ProtectedComponent = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Please sign in to access this feature.</div>;
  }
  
  return <div>Protected content here</div>;
};
```

## Next Steps

1. **Customize the UI**: Update the styling of the authentication components to match your app's design
2. **Add Social Login**: Configure Google, Facebook, or other OAuth providers in Cognito
3. **Implement User Data**: Use DynamoDB to store user preferences and show lists
4. **Add Password Reset**: Implement forgot password functionality
5. **Email Templates**: Customize the email templates in Cognito for verification and password reset

## Troubleshooting

### Common Issues

1. **"Unable to locate credentials"**
   - Run `aws configure` to set up your AWS credentials

2. **"Access Denied" errors**
   - Ensure your AWS user has the necessary permissions for Cognito, DynamoDB, and IAM

3. **"User Pool not found"**
   - Check that the User Pool ID in your .env file matches the one created

4. **Email not sending**
   - Check your AWS SES configuration if using custom email sending

### Useful AWS CLI Commands

```bash
# List User Pools
aws cognito-idp list-user-pools --max-items 10

# List Identity Pools
aws cognito-identity list-identity-pools --max-results 10

# Check DynamoDB tables
aws dynamodb list-tables
```

## Security Best Practices

1. **Never commit .env files** to version control
2. **Use HTTPS** in production
3. **Implement proper CORS** settings
4. **Regular security audits** of IAM policies
5. **Monitor AWS CloudTrail** for suspicious activity

## Cost Considerations

All resources created should stay within AWS Free Tier limits for personal projects:
- Cognito: 50,000 MAUs free
- DynamoDB: 25GB storage free
- IAM: No additional charges

## Support

If you encounter issues:
1. Check the AWS Console for error messages
2. Review CloudWatch logs
3. Verify your .env configuration
4. Test with AWS CLI commands

Happy coding! 🚀
