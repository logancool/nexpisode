import fetchJWTToken from './fetchJWTToken';

export const getShowSeasons = async (tvdbId) => {
  try {
    const tokenResponse = await fetchJWTToken();
    const response = await fetch(`https://api4.thetvdb.com/v4/series/${tvdbId}/seasons`, {
      headers: {
        'Authorization': `Bearer ${tokenResponse.data.token}`,
      },
    });
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching seasons:', error);
    return [];
  }
};

export const getLatestSeason = async (tvdbId) => {
  const seasons = await getShowSeasons(tvdbId);
  if (seasons.length === 0) return null;
  
  // Filter out specials (season 0) and get the highest season number
  const regularSeasons = seasons.filter(season => season.number > 0);
  if (regularSeasons.length === 0) return seasons[0];
  
  return regularSeasons.reduce((latest, current) => 
    current.number > latest.number ? current : latest
  );
};

export const getShowWithLatestSeason = async (tvdbId) => {
  try {
    const [tokenResponse, latestSeason] = await Promise.all([
      fetchJWTToken(),
      getLatestSeason(tvdbId)
    ]);
    
    const seasonParam = latestSeason ? `?year=${latestSeason.number}` : '';
    const response = await fetch(`https://api4.thetvdb.com/v4/series/${tvdbId}${seasonParam}`, {
      headers: {
        'Authorization': `Bearer ${tokenResponse.data.token}`,
      },
    });
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching show with latest season:', error);
    return null;
  }
};