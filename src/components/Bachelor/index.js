import React, { useState, useEffect } from 'react';
import './style.css';


const Bachelor = () => {
  const toPST = (basicDate) => basicDate.toLocaleString("en-US", { timeZone: "PST" });

  const [nexpisode, updateNexpisode] = useState("¯\\_(ツ)_/¯");
  const [nextAired, updateNextAired] = useState({ iso: null, pst: null });
  const [today, updateToday] = useState({ iso: new Date().toISOString(), pst: toPST(new Date()) });

  const PST_TIME = 'T20:00:00';

  const isoDateToCompare = (isostr) => {
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
        console.log('trying to fetch jwt token')
        const response = await fetch('/v4/login', {
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
        const remaining = ((isoDateToCompare(nextAiredTVDBIso) - isoDateToCompare(today.iso)) / 60000).toFixed(2);
        if (nextAiredTVDBIso > today.iso) {
          updateNexpisode(`${remaining} mins`);
          updateNextAired({ pst: toPST(new Date(nextAiredTVDBIso)) });
        }
      });
    })

    const intervalID = setInterval(() => updateToday({ iso: new Date().toISOString(), pst: toPST(Date()) }), 3000);

    return () => clearInterval(intervalID);

  }, [updateNexpisode, today, nexpisode])
  return (
    <div className="bachelor">
      {nexpisode}
      <br />
      remaining...
      {nextAired.pst}
    </div>
  )
}

export default Bachelor;