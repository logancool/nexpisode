import { useState, useEffect, createContext, useContext } from 'react';
import {
  getCurrentUser,
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resendSignUpCode,
} from 'aws-amplify/auth';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log('No authenticated user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign In
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
      });

      if (isSignedIn) {
        await checkAuthState();
        return { success: true };
      }

      return { success: false, nextStep };
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign Up
  const register = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
          },
        },
      });

      return {
        success: true,
        isSignUpComplete,
        userId,
        nextStep,
      };
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Confirm Sign Up
  const confirmRegistration = async (email, confirmationCode) => {
    try {
      setError(null);
      setLoading(true);
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      return { success: true, isSignUpComplete, nextStep };
    } catch (error) {
      console.error('Confirmation error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Resend Confirmation Code
  const resendConfirmation = async (email) => {
    try {
      setError(null);
      await resendSignUpCode({ username: email });
      return { success: true };
    } catch (error) {
      console.error('Resend confirmation error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      setError(null);
      setLoading(true);
      await signOut();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    confirmRegistration,
    resendConfirmation,
    logout,
    checkAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
