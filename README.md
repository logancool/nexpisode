# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [pnpm](https://pnpm.io/) for package management.

## Prerequisites

- Node.js (v16 or higher)
- pnpm (install with `npm install -g pnpm`)

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `pnpm run lint`

Runs ESLint to check for code quality issues and potential bugs.

### `pnpm run lint:fix`

Runs ESLint with automatic fixing of fixable issues.

### `pnpm run format`

Formats code using Prettier for consistent code style.

### `pnpm run type-check`

Runs TypeScript compiler to check for type errors without emitting files.

### `pnpm run pre-commit`

Runs the complete pre-commit workflow: type-check, lint, and format.
Use this before committing changes to ensure code quality.

## AWS Cognito Authentication

This app includes AWS Cognito authentication with:
- User registration and email verification
- Secure login/logout
- Password requirements (8+ characters, uppercase, lowercase, numbers)
- Integration with AWS services

### Environment Variables

Make sure to set up your `.env` file with the following variables:
```
REACT_APP_USER_POOL_ID=your-user-pool-id
REACT_APP_USER_POOL_CLIENT_ID=your-client-id
REACT_APP_IDENTITY_POOL_ID=your-identity-pool-id
REACT_APP_AWS_REGION=us-east-1
```

## Development Workflow

1. **Install dependencies**: `pnpm install`
2. **Start development**: `pnpm start`
3. **Before committing**: `pnpm run pre-commit`
4. **Build for production**: `pnpm run build`

## Why pnpm?

This project uses pnpm instead of npm for:
- **Faster installations** - Up to 2x faster than npm
- **Disk space efficiency** - Shared dependencies across projects
- **Strict dependency resolution** - Better security and reliability
- **Monorepo support** - Better for scaling

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about pnpm, check out the [pnpm documentation](https://pnpm.io/).
