const TVDB_API_HOST =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.REACT_APP_TVDB_API_HOST;

async function fetchEpisode(token, episode) {
  try {
    const response = await fetch(`${TVDB_API_HOST}/v4/series/${episode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (err) {
    console.log(`failure fetching episode: ${episode}`);
    throw new Error(err);
  }
}

export default fetchEpisode;
