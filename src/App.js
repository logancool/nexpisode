<<<<<<< HEAD
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
        <Route
          path="/bachelor"
          element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          }
        />
        <Route
          path="/kardashians"
          element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          }
        />
        <Route
          path="/bachelorette"
          element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          }
        />
        <Route
          path="/sp"
          element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          }
        />
        <Route
          path="/st"
          element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          }
        />
        <Route
          path="/south-park"
          element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          }
        />
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
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShowWrapper from "./ShowWrapper";
import Home from "./Home";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path=":id" element={<ShowWrapper />} />
			</Routes>
		</BrowserRouter>
	);
>>>>>>> de7054fd20e209b28a8cd6833c74ce6f8fa9f700
};

export default App;
