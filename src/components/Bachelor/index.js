import React, { useState, useEffect } from 'react';
import './style.css';

const Bachelor = () => {
  const [nexpisode, updateNexpisode] = useState("¯\\_(ツ)_/¯");
  const [today, updateToday] = useState(new Date().toLocaleString("en-US", { timeZone: "PST" }));

  const PST_TIME = 'T20:00:00';

  function dateFromISO8601(isostr) {
    var parts = isostr.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  }

  useEffect(() => {

    const TVDB_API_KEY = process.env.REACT_APP_TVDB_API_KEY;

    const data = {
      apikey: TVDB_API_KEY,
      pin: 'string',
    };

    const headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    };

    async function fetchJWTToken() {
      try {
        const response = await fetch('/v4/login', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data)
        });

        return response.json();

      } catch (err) {
        throw new Error(err);
      }
    };

    async function fetchBachelorEpisode(token) {
      try {
        const response = await fetch('/v4/series/70869?year=25', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        return response.json();

      } catch (err) {
        throw new Error(err);
      }
    }

    // fetchJWTToken().then(token => {
    //   fetchBachelorEpisode(token.data.token).then(episodeData => {
    //     const lastAired = new Date(`${episodeData.data.lastAired}${PST_TIME}`).toISOString();
    //     const remaining = ((dateFromISO8601(lastAired) - dateFromISO8601(today)) / 60000).toFixed(2);
    //     if (lastAired > today) {
    //       updateNexpisode(`${remaining} mins`);
    //     }
    //   });
    // })

    const intervalID = setInterval(() => updateToday(new Date().toISOString()), 100);
    return () => clearInterval(intervalID);

  }, [updateNexpisode, today, nexpisode])
  return (
    <div className="bachelor">
      {nexpisode}
      <br />
      remaining...
    </div>
  )
}

export default Bachelor;