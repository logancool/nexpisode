import { useState } from 'react';
import fetchJWTToken from '../services/fetchJWTToken';
import './ShowSearch.css';

const ShowSearch = ({ onAddShow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchShows = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const tokenResponse = await fetchJWTToken();
      const response = await fetch(
        `https://api4.thetvdb.com/v4/search?query=${encodeURIComponent(searchTerm)}&type=series`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.token}`,
          },
        }
      );

      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchShows();
    }
  };

  return (
    <div className="show-search">
      <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search TV shows..."
          className="search-field"
        />
        <button onClick={searchShows} disabled={loading} className="search-btn">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.slice(0, 10).map((show) => (
            <div key={show.tvdb_id} className="search-result">
              <div className="show-info">
                <strong>{show.name}</strong>
                {show.year && <span> ({show.year})</span>}
                {show.overview && (
                  <div className="show-overview">
                    {show.overview.substring(0, 100)}...
                  </div>
                )}
              </div>
              <button
                onClick={() =>
                  onAddShow({
                    id: show.tvdb_id,
                    name: show.name,
                    tvdbId: show.tvdb_id,
                    year: show.year,
                  })
                }
                className="add-show-btn"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSearch;
