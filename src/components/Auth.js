import { useState, useEffect } from 'react';
import './Auth.css';

const Auth = ({ onAuthChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for saved user on component mount
    const savedUser = localStorage.getItem('nexpisode-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      onAuthChange(userData);
    }
  }, [onAuthChange]);

  const handleSignIn = () => {
    // Mock user for testing - replace with real Google OAuth later
    const mockUser = {
      userId: 'test-user-123',
      signInDetails: { loginId: 'test@gmail.com' },
      shows: []
    };
    setUser(mockUser);
    localStorage.setItem('nexpisode-user', JSON.stringify(mockUser));
    onAuthChange(mockUser);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('nexpisode-user');
    onAuthChange(null);
  };

  return (
    <div className="auth-container">
      <a href="/" className="home-button">Home</a>
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
