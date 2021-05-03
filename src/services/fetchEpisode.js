async function fetchEpisode(token, episode) {
  try {
    console.log(`trying to fetch ${episode} episode`);
    const response = await fetch(`/v4/series/${episode}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.json();

  } catch (err) {
    console.log(`failure getting ${episode} episode`);
    throw new Error(err);
  }
}

export default fetchEpisode;