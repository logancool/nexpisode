import React, { useState, useEffect } from 'react';
import './style.css';


const Bachelor = () => {
  const toPST = (basicDate) => basicDate.toLocaleString("en-US", { timeZone: "PST" });

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

    const TVDB_API_KEY = process.env.REACT_APP_TVDB_API_KEY;
    const TVDB_API_PIN = process.env.REACT_APP_TVDB_API_PIN;
    const TVDB_API_HOST = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_TVDB_API_HOST;

    const data = {
      apikey: TVDB_API_KEY,
      pin: TVDB_API_PIN,
    };

    const headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    };

    async function fetchJWTToken() {
      try {
        console.log('trying to fetch jwt token')
        const response = await fetch(`${TVDB_API_HOST}/v4/login`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data)
        });

        return response.json();

      } catch (err) {
        console.log('fetch JWT token error')
        throw new Error(err);
      }
    };

    async function fetchBachelorEpisode(token) {
      try {
        console.log('trying to fetch bachelor episode');
        const response = await fetch('/v4/series/70869?year=25', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        return response.json();

      } catch (err) {
        console.log('failure getting bachelor episode');
        throw new Error(err);
      }
    }

    fetchJWTToken().then(token => {
      fetchBachelorEpisode(token.data.token).then(episodeData => {
        const nextAiredTVDBIso = new Date(`${episodeData.data.lastAired}${PST_TIME}`).toISOString();
        updateNextAired({ iso: nextAiredTVDBIso, pst: toPST(new Date(nextAiredTVDBIso)) });
      });
    })
  }, [])

  useEffect(() => {
    const remaining = ((isoDateToCompare(nextAired.iso) - isoDateToCompare(today.iso)) / 60000).toFixed(2);
    // it takes time for 
    if (remaining > 0) {
      updateNexpisode(`${remaining} mins`);
    }

    const intervalID = setInterval(() => updateToday({ iso: new Date().toISOString(), pst: toPST(Date()) }), 1000);

    return () => clearInterval(intervalID);
  }, [nextAired, today]);

  return (
    <div className="bachelor">
      {nexpisode}
      <br />
      remaining...
    </div>
  )
}

export default Bachelor;