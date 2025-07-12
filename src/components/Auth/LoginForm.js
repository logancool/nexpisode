import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const { login, register, confirmRegistration, resendConfirmation, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (showConfirmation) {
      const result = await confirmRegistration(pendingEmail, confirmationCode);
      if (result.success) {
        setShowConfirmation(false);
        setIsSignUp(false);
        alert('Account confirmed! You can now sign in.');
      }
      return;
    }

    if (isSignUp) {
      const result = await register(email, password);
      if (result.success && !result.isSignUpComplete) {
        setPendingEmail(email);
        setShowConfirmation(true);
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        // User is now logged in
        console.log('Login successful');
      }
    }
  };

  const handleResendCode = async () => {
    const result = await resendConfirmation(pendingEmail);
    if (result.success) {
      alert('Confirmation code resent!');
    }
  };

  if (showConfirmation) {
    return (
      <div className="auth-form">
        <h2>Confirm Your Account</h2>
        <p>Please check your email for a confirmation code.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="confirmationCode">Confirmation Code:</label>
            <input
              type="text"
              id="confirmationCode"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm Account'}
          </button>
          <button type="button" onClick={handleResendCode} disabled={loading}>
            Resend Code
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="auth-form">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>
      
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button 
          type="button" 
          onClick={() => setIsSignUp(!isSignUp)}
          className="link-button"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
      
      {error && <p className="error">{error}</p>}
      
      <style jsx>{`
        .auth-form {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        
        .auth-form div {
          margin-bottom: 1rem;
        }
        
        .auth-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        .auth-form input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .auth-form button {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 0.5rem;
        }
        
        .auth-form button:hover:not(:disabled) {
          background-color: #0056b3;
        }
        
        .auth-form button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .link-button {
          background: none !important;
          border: none !important;
          color: #007bff !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          width: auto !important;
          padding: 0 !important;
        }
        
        .error {
          color: #dc3545;
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
