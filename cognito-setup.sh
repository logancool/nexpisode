#!/bin/bash

# Cognito Setup Script for nexpisode
# This script will create all necessary AWS Cognito resources

set -e

echo "🚀 Setting up AWS Cognito for nexpisode..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    echo "You'll need:"
    echo "  - AWS Access Key ID"
    echo "  - AWS Secret Access Key"
    echo "  - Default region (recommend: us-east-1)"
    echo "  - Default output format (recommend: json)"
    exit 1
fi

REGION="us-east-1"
POOL_NAME="nexpisode-users"
CLIENT_NAME="nexpisode-client"
IDENTITY_POOL_NAME="nexpisode-identity"

echo "📝 Creating Cognito User Pool..."

# Create User Pool
USER_POOL_ID=$(aws cognito-idp create-user-pool \
    --pool-name "$POOL_NAME" \
    --region "$REGION" \
    --policies '{
        "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireUppercase": true,
            "RequireLowercase": true,
            "RequireNumbers": true,
            "RequireSymbols": false
        }
    }' \
    --auto-verified-attributes email \
    --alias-attributes email \
    --mfa-configuration OFF \
    --account-recovery-setting '{
        "RecoveryMechanisms": [
            {
                "Priority": 1,
                "Name": "verified_email"
            }
        ]
    }' \
    --verification-message-template '{
        "DefaultEmailOption": "CONFIRM_WITH_CODE"
    }' \
    --query 'UserPool.Id' \
    --output text)

echo "✅ User Pool created: $USER_POOL_ID"

echo "📱 Creating User Pool Client..."

# Create User Pool Client
CLIENT_ID=$(aws cognito-idp create-user-pool-client \
    --user-pool-id "$USER_POOL_ID" \
    --client-name "$CLIENT_NAME" \
    --region "$REGION" \
    --no-generate-secret \
    --explicit-auth-flows ALLOW_USER_SRP_AUTH ALLOW_REFRESH_TOKEN_AUTH \
    --supported-identity-providers COGNITO \
    --callback-urls "http://localhost:3000/" "https://your-domain.com/" \
    --logout-urls "http://localhost:3000/" "https://your-domain.com/" \
    --query 'UserPoolClient.ClientId' \
    --output text)

echo "✅ User Pool Client created: $CLIENT_ID"

echo "🔐 Creating Identity Pool..."

# Create Identity Pool
IDENTITY_POOL_ID=$(aws cognito-identity create-identity-pool \
    --identity-pool-name "$IDENTITY_POOL_NAME" \
    --region "$REGION" \
    --no-allow-unauthenticated-identities \
    --cognito-identity-providers ProviderName=cognito-idp.$REGION.amazonaws.com/$USER_POOL_ID,ClientId=$CLIENT_ID \
    --query 'IdentityPoolId' \
    --output text)

echo "✅ Identity Pool created: $IDENTITY_POOL_ID"

echo "📋 Creating DynamoDB table..."

# Create DynamoDB table for user shows
aws dynamodb create-table \
    --table-name nexpisode-user-shows \
    --region "$REGION" \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=showId,AttributeType=S \
    --key-schema \
        AttributeName=userId,KeyType=HASH \
        AttributeName=showId,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --tags Key=Project,Value=nexpisode > /dev/null

echo "✅ DynamoDB table created: nexpisode-user-shows"

echo "🔧 Creating IAM roles for Identity Pool..."

# Create IAM role for authenticated users
ROLE_DOC='{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "cognito-identity.amazonaws.com:aud": "'$IDENTITY_POOL_ID'"
                },
                "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "authenticated"
                }
            }
        }
    ]
}'

ROLE_ARN=$(aws iam create-role \
    --role-name nexpisode-authenticated-role \
    --assume-role-policy-document "$ROLE_DOC" \
    --query 'Role.Arn' \
    --output text)

echo "✅ IAM role created: $ROLE_ARN"

# Attach policy to role
POLICY_DOC='{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Query",
                "dynamodb:Scan"
            ],
            "Resource": "arn:aws:dynamodb:'$REGION':*:table/nexpisode-user-shows"
        }
    ]
}'

aws iam put-role-policy \
    --role-name nexpisode-authenticated-role \
    --policy-name nexpisode-dynamodb-policy \
    --policy-document "$POLICY_DOC"

echo "✅ IAM policy attached"

# Set Identity Pool roles
aws cognito-identity set-identity-pool-roles \
    --identity-pool-id "$IDENTITY_POOL_ID" \
    --region "$REGION" \
    --roles authenticated="$ROLE_ARN"

echo "✅ Identity Pool roles configured"

# Get OAuth domain
OAUTH_DOMAIN=$(aws cognito-idp describe-user-pool \
    --user-pool-id "$USER_POOL_ID" \
    --region "$REGION" \
    --query 'UserPool.Domain' \
    --output text)

if [ "$OAUTH_DOMAIN" = "None" ]; then
    OAUTH_DOMAIN="$USER_POOL_ID.auth.$REGION.amazoncognito.com"
fi

echo ""
echo "🎉 Setup complete! Update your .env file with these values:"
echo ""
echo "REACT_APP_USER_POOL_ID=$USER_POOL_ID"
echo "REACT_APP_USER_POOL_CLIENT_ID=$CLIENT_ID"
echo "REACT_APP_IDENTITY_POOL_ID=$IDENTITY_POOL_ID"
echo "REACT_APP_OAUTH_DOMAIN=$OAUTH_DOMAIN"
echo "REACT_APP_AWS_REGION=$REGION"
echo ""
echo "🔧 Next steps:"
echo "1. Update your .env file with the values above"
echo "2. Install AWS Amplify dependencies (already done)"
echo "3. Configure Amplify in your React app"
echo "4. Test authentication flow"
