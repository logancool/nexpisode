#!/bin/bash

# Install Amplify CLI if not installed
npm install -g @aws-amplify/cli

# Initialize Amplify project
amplify init --yes

# Add authentication with Google
amplify add auth

# Add API with DynamoDB
amplify add api

# Push changes to AWS
amplify push --yes

echo "Setup complete! Check amplify/backend/amplify-meta.json for your config values"