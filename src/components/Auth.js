import { useState, useEffect } from 'react';
import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import './Auth.css';

const Auth = ({ onAuthChange }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        onAuthChange(currentUser);
      } catch (error) {
        setUser(null);
        onAuthChange(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [onAuthChange]);

  const handleSignIn = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      onAuthChange(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) return <div className="auth-loading">Loading...</div>;

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
