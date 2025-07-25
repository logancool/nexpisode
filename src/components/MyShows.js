import { useState, useEffect } from 'react';
import {
  getUserShows,
  addShowToList,
  removeShowFromList,
} from '../services/showService';
import ShowSearch from './ShowSearch';
import './MyShows.css';

const MyShows = ({ user }) => {
  const [myShows, setMyShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load shows from user object (localStorage)
      setMyShows(user.shows || []);
      setLoading(false);
    }
  }, [user]);

  const addShow = async (show) => {
    if (myShows.some((s) => s.id === show.id)) {
      alert('Show already in your list!');
      return;
    }

    if (myShows.length >= 10) {
      alert('Maximum 10 shows allowed!');
      return;
    }

    const newShows = [...myShows, show];
    setMyShows(newShows);
    
    // Update user object with shows for dynamic routing
    user.shows = newShows;
    localStorage.setItem('nexpisode-user', JSON.stringify(user));

    try {
      await addShowToList(user.userId, show);
    } catch (error) {
      console.error('Error adding show:', error);
    }
  };

  const removeShow = async (showId) => {
    const newShows = myShows.filter((show) => show.id !== showId);
    setMyShows(newShows);
    
    // Update user object with shows
    user.shows = newShows;
    localStorage.setItem('nexpisode-user', JSON.stringify(user));

    try {
      await removeShowFromList(user.userId, showId);
    } catch (error) {
      console.error('Error removing show:', error);
    }
  };

  if (!user) return null;
  if (loading)
    return <div className="my-shows-loading">Loading your shows...</div>;

  return (
    <div className="my-shows">
      <h2>Add Shows</h2>

      <ShowSearch onAddShow={addShow} />

      {myShows.length === 0 ? (
        <div className="no-shows">
          No shows added yet. Search and add some above!
        </div>
      ) : (
        <div className="shows-grid">
          {myShows.map((show) => {
            const showSlug = show.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return (
              <div key={show.id} className="show-item">
                <div className="show-info">
                  <a href={`/${showSlug}`} className="show-link">
                    <strong>{show.name}</strong>
                  </a>
                  {show.year && <span> ({show.year})</span>}
                </div>
                <button
                  onClick={() => removeShow(show.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyShows;
