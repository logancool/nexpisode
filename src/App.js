import {
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import fetchEpisode from './services/fetchEpisode';
import fetchJWTToken from './services/fetchJWTToken';
import './App.css';

const App = () => {

  // for the url as key what's the api query
  const episodeMap = {
    bachelor: '70869?year=25',
    grey: '',
  };


  const toPST = (basicDate) => basicDate.toLocaleString("en-US", { timeZone: "PST" });

  const [episode, setEpisode] = useState(null);
  const [nexpisode, updateNexpisode] = useState("¯\\_(ツ)_/¯");
  // currently we're not using this
  // eslint-disable-next-line no-unused-vars 
  const [nextAired, updateNextAired] = useState({ iso: new Date().toISOString(), pst: toPST(new Date()) });
  const [today, updateToday] = useState({ iso: new Date().toISOString(), pst: toPST(new Date()) });

  const PST_TIME = 'T20:00:00';

  // makes date able to be subtracted from
  const isoDateToCompare = (isoDate) => {
    const parts = isoDate.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  }

  // we're using two useEffect since we only need to make our fetch call once
  // on request
  useEffect(() => {
    const episodeKey = window.location.pathname.replace(/\W/g, '');
    setEpisode(() => episodeMap[episodeKey]);
    if (episode) {
      fetchJWTToken().then(token => {
        console.log(episode);
        fetchEpisode(token.data.token, episode).then(episodeData => {
          const nextAiredTVDBIso = new Date(`${episodeData.data.lastAired}${PST_TIME}`).toISOString();
          updateNextAired({ iso: nextAiredTVDBIso, pst: toPST(new Date(nextAiredTVDBIso)) });
        });
      })
    }
  }, [episode, episodeMap])

  useEffect(() => {
    const remaining = ((isoDateToCompare(nextAired.iso) - isoDateToCompare(today.iso)) / 60000).toFixed(2);

    if (remaining > 0) {
      updateNexpisode(`${remaining} mins`);
    }

    const intervalID = setInterval(() => updateToday({ iso: new Date().toISOString(), pst: toPST(Date()) }), 1000);

    return () => clearInterval(intervalID);
  }, [nextAired, today]);

  return (
    <Router>
      <Switch>
        <Route exact path="/bachelor">
          <div className="episode">
            {nexpisode}
            <br />
           remaining...
          </div>
        </Route>
        <Route exact path="/grey">
          <div className="episode">
            {nexpisode}
            <br />
           remaining...
           </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
