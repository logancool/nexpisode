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
    const loadUserShows = async () => {
      try {
        const shows = await getUserShows(user.userId);
        setMyShows(shows || []);
      } catch (error) {
        console.error('Error loading shows:', error);
        setMyShows([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserShows();
    }
  }, [user]);

  const addShow = async (show) => {
    if (myShows.some((s) => s.id === show.id)) {
      alert('Show already in your list!');
      return;
    }

    try {
      await addShowToList(user.userId, show);
      setMyShows([...myShows, show]);
    } catch (error) {
      console.error('Error adding show:', error);
      setMyShows([...myShows, show]);
    }
  };

  const removeShow = async (showId) => {
    try {
      await removeShowFromList(user.userId, showId);
      setMyShows(myShows.filter((show) => show.id !== showId));
    } catch (error) {
      console.error('Error removing show:', error);
      setMyShows(myShows.filter((show) => show.id !== showId));
    }
  };

  if (!user) return null;
  if (loading)
    return <div className="my-shows-loading">Loading your shows...</div>;

  return (
    <div className="my-shows">
      <h2>My Shows</h2>

      <ShowSearch onAddShow={addShow} />

      {myShows.length === 0 ? (
        <div className="no-shows">
          No shows added yet. Search and add some above!
        </div>
      ) : (
        <div className="shows-grid">
          {myShows.map((show) => (
            <div key={show.id} className="show-item">
              <div className="show-info">
                <strong>{show.name}</strong>
                {show.year && <span> ({show.year})</span>}
              </div>
              <button
                onClick={() => removeShow(show.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyShows;
