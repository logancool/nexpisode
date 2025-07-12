import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log('Logged out successfully');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <div className="user-info">
        <h3>Welcome, {user.username}!</h3>
        <p>Email: {user.signInDetails?.loginId || 'N/A'}</p>
        <p>User ID: {user.userId}</p>
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="logout-button"
      >
        {loading ? 'Signing out...' : 'Sign Out'}
      </button>

      <style jsx>{`
        .user-profile {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f8f9fa;
        }

        .user-info {
          margin-bottom: 1.5rem;
        }

        .user-info h3 {
          margin: 0 0 1rem 0;
          color: #333;
        }

        .user-info p {
          margin: 0.5rem 0;
          color: #666;
        }

        .logout-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }

        .logout-button:hover:not(:disabled) {
          background-color: #c82333;
        }

        .logout-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
