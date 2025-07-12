import { useState, useEffect } from 'react';
import {
  getUserShows,
  addShowToList,
  removeShowFromList,
} from '../services/showService';
import './MyShows.css';

const availableShows = [
  { id: 'bachelor', name: 'The Bachelor', tvdbId: '70869' },
  { id: 'bachelorette', name: 'The Bachelorette', tvdbId: '71187' },
  { id: 'sp', name: 'South Park', tvdbId: '75897' },
  { id: 'st', name: 'Stranger Things', tvdbId: '305288' },
  {
    id: 'kardashians',
    name: 'Keeping Up with the Kardashians',
    tvdbId: '80725',
  },
];

const MyShows = ({ user }) => {
  const [myShows, setMyShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserShows = async () => {
      try {
        const shows = await getUserShows(user.userId);
        setMyShows(shows);
      } catch (error) {
        console.error('Error loading shows:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserShows();
    }
  }, [user]);

  const addShow = async (show) => {
    try {
      await addShowToList(user.userId, show);
      setMyShows([...myShows, show]);
    } catch (error) {
      console.error('Error adding show:', error);
    }
  };

  const removeShow = async (showId) => {
    try {
      await removeShowFromList(user.userId, showId);
      setMyShows(myShows.filter((show) => show.id !== showId));
    } catch (error) {
      console.error('Error removing show:', error);
    }
  };

  const isShowAdded = (showId) => myShows.some((show) => show.id === showId);

  if (!user) return null;
  if (loading)
    return <div className="my-shows-loading">Loading your shows...</div>;

  return (
    <div className="my-shows">
      <h2>My Shows</h2>
      <div className="shows-grid">
        {availableShows.map((show) => (
          <div key={show.id} className="show-item">
            <a href={`/${show.id}`} className="show-link">
              {show.name}
            </a>
            {isShowAdded(show.id) ? (
              <button
                onClick={() => removeShow(show.id)}
                className="remove-btn"
              >
                Remove
              </button>
            ) : (
              <button onClick={() => addShow(show)} className="add-btn">
                Add
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyShows;
