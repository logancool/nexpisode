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
  const [episode, setEpisode] = useState(null);
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
      const showId = pathSegments[1];
      
      if (showId && user && user.shows) {
        const userShow = user.shows.find(show => 
          show.id === showId || show.name.toLowerCase().replace(/\s+/g, '-') === showId
        );
        
        if (userShow) {
          const showData = await getShowWithLatestSeason(userShow.tvdbId);
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
  }, [user]);

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
    <Router>
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
