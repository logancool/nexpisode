import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './aws-config'; // Import AWS configuration
import {
  PST,
  toPST,
  toSeconds,
  toMins,
  toHours,
  toDays,
} from "./utilities/parseDate";
import ShowWrapper from "./ShowWrapper";
import Home from "./Home";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import LoginForm from "./components/Auth/LoginForm";
import UserProfile from "./components/Auth/UserProfile";
import MyShows from "./components/MyShows";
import episodeMap from "./utilities/episodeMap";
import subtractISODates from "./utilities/subtractISODates";
import fetchEpisode from "./services/fetchEpisode";
import fetchJWTToken from "./services/fetchJWTToken";

const dateMap = [toSeconds, toMins, toHours, toDays];

// Main App Component
const AppContent = () => {
  const [episode, setEpisode] = useState(null);
  const [nexpisode, updateNexpisode] = useState("¯\\_(ツ)_/¯");
  const [dateIndex, updateDateIndex] = useState(0);
  const { user } = useAuth();
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

  // we're using two useEffect since we only need to make our fetch call once
  // on request
  useEffect(() => {
    // set the episode
    const episodeString = window.location.pathname.replace(/\W/g, "");

    if (episodeString) {
      setEpisode(episodeMap[episodeString]);
    }

    if (episode) {
      fetchJWTToken().then((token) => {
        fetchEpisode(token.data.token, episode).then((episodeData) => {
          if (episodeData.data.nextAired) {
            const nextAiredTVDBIso = new Date(
              `${episodeData.data.nextAired}${PST}`
            ).toISOString();
            updateNextAired({
              iso: nextAiredTVDBIso,
              pst: toPST(new Date(nextAiredTVDBIso)),
            });
          }
        });
      });
    }
  }, [episode]);

  useEffect(() => {
    const UTCRemaining = subtractISODates(nextAired.iso, today.iso);

    if (UTCRemaining > 0) {
      const remaining = dateMap[dateIndex](UTCRemaining);
      updateNexpisode(
        `${remaining.amount.toLocaleString("en-US", {
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
      <div className="app">
        {/* Auth Section */}
        <div className="auth-section">
          {user ? <UserProfile /> : <LoginForm />}
        </div>
        
        <Routes>
          <Route path="/bachelor" element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          } />
          <Route path="/kardashians" element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          } />
          <Route path="/bachelorette" element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          } />
          <Route path="/sp" element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          } />
          <Route path="/st" element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          } />
          <Route path="/south-park" element={
            <ShowWrapper
              nexpisode={nexpisode}
              airDate={nextAired}
              changeDate={changeDate}
            />
          } />
          <Route path="/my-shows" element={<MyShows user={user} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

// App wrapper with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
