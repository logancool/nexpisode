import { useState } from 'react';
import './Auth.css';

const Auth = ({ onAuthChange }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    // Mock user for testing - replace with real Google OAuth later
    const mockUser = {
      userId: 'test-user-123',
      signInDetails: { loginId: 'test@gmail.com' },
    };
    setUser(mockUser);
    onAuthChange(mockUser);
  };

  const handleSignOut = () => {
    setUser(null);
    onAuthChange(null);
  };

  return (
    <div className="auth-container">
      {user ? (
        <div className="auth-user">
          <span>Hello, {user.signInDetails?.loginId || 'User'}</span>
          <button onClick={handleSignOut} className="auth-button">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={handleSignIn} className="auth-button">
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
