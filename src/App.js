import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  PST,
  toPST,
  toSeconds,
  toMins,
  toHours,
  toDays,
} from './utilities/parseDate';
import ShowWrapper from './ShowWrapper';
import Home from './Home';
import Auth from './components/Auth';
import MyShows from './components/MyShows';
import subtractISODates from './utilities/subtractISODates';
import { getShowWithLatestSeason } from './services/tvdbService';

const dateMap = [toSeconds, toMins, toHours, toDays];

const App = () => {
  const [nexpisode, updateNexpisode] = useState('¯\\_(ツ)_/¯');
  const [dateIndex, updateDateIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [nextAired, updateNextAired] = useState({
    iso: new Date().toISOString(),
    pst: toPST(new Date()),
  });
  const [today, updateToday] = useState({
    iso: new Date().toISOString(),
    pst: toPST(new Date()),
  });

  const changeDate = () => {
    const nextDateIndex = (dateIndex + 1) % dateMap.length;
    updateDateIndex(nextDateIndex);
  };

  useEffect(() => {
    const loadShowData = async () => {
      const pathSegments = window.location.pathname.split('/');
      const showSlug = pathSegments[2];
      
      console.log('Loading show data for:', showSlug);
      
      if (showSlug && showSlug !== 'add-shows') {
        let tvdbId = null;
        
        // First check user's shows
        if (user && user.shows) {
          const userShow = user.shows.find(show => 
            show.id === showSlug || show.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === showSlug
          );
          if (userShow) {
            tvdbId = userShow.tvdbId;
            console.log('Found in user shows:', userShow);
          }
        }
        
        // If not in user's shows, search TVDB
        if (!tvdbId) {
          console.log('Searching TVDB for:', showSlug);
          try {
            const searchQuery = showSlug.replace(/-/g, ' ');
            const tokenResponse = await fetch('https://api4.thetvdb.com/v4/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                apikey: process.env.REACT_APP_TVDB_API_KEY,
                pin: process.env.REACT_APP_TVDB_API_PIN
              })
            });
            const tokenData = await tokenResponse.json();
            
            const searchResponse = await fetch(`https://api4.thetvdb.com/v4/search?query=${encodeURIComponent(searchQuery)}&type=series`, {
              headers: { 'Authorization': `Bearer ${tokenData.data.token}` }
            });
            const searchData = await searchResponse.json();
            
            if (searchData.data && searchData.data.length > 0) {
              tvdbId = searchData.data[0].tvdb_id;
              console.log('Found via search:', searchData.data[0]);
            }
          } catch (error) {
            console.error('Search error:', error);
          }
        }
        
        // Load show data if we have a tvdbId
        if (tvdbId) {
          console.log('Fetching TVDB data for:', tvdbId);
          const showData = await getShowWithLatestSeason(tvdbId);
          console.log('TVDB response:', showData);
          
          if (showData && showData.nextAired) {
            const nextAiredTVDBIso = new Date(
              `${showData.nextAired}${PST}`
            ).toISOString();
            updateNextAired({
              iso: nextAiredTVDBIso,
              pst: toPST(new Date(nextAiredTVDBIso)),
            });
          }
        }
      }
    };
    
    loadShowData();
  }, [user, window.location.pathname]);

  useEffect(() => {
    const UTCRemaining = subtractISODates(nextAired.iso, today.iso);

    if (UTCRemaining > 0) {
      const remaining = dateMap[dateIndex](UTCRemaining);
      updateNexpisode(
        `${remaining.amount.toLocaleString('en-US', {
          maximumFractionDigits: 0,
        })} ${remaining.unit}`
      );
    }
    // cause a rerender every second
    const intervalID = setInterval(
      () => updateToday({ iso: new Date().toISOString(), pst: toPST(Date()) }),
      1000
    );

    return () => clearInterval(intervalID);
  }, [nextAired, dateIndex, today]);

  return (
    <Router basename="/nexpisode" future={{ v7_startTransition: true }}>
      <Auth onAuthChange={setUser} />
      <Routes>
        <Route path="/add-shows" element={<MyShows user={user} />} />
        <Route path="/:showSlug" element={
          <ShowWrapper
            nexpisode={nexpisode}
            airDate={nextAired}
            changeDate={changeDate}
          />
        } />
        <Route path="/" element={<Home user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
