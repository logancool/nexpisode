const fetch = require('node-fetch');

const TVDB_API_HOST = 'https://api4.thetvdb.com';
const TVDB_API_KEY = '0d51e828-60db-448d-8ec4-2bceb87316d7';
const TVDB_API_PIN = 'WORUCUTI';

async function testAPI() {
  try {
    console.log('Testing TVDB API connection...');
    
    // Test JWT token
    const tokenResponse = await fetch(`${TVDB_API_HOST}/v4/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        apikey: TVDB_API_KEY,
        pin: TVDB_API_PIN,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    console.log('Token response:', tokenData);
    
    if (tokenData.data && tokenData.data.token) {
      console.log('✅ JWT token obtained successfully');
      
      // Test episode fetch
      const episodeResponse = await fetch(`${TVDB_API_HOST}/v4/series/290434`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenData.data.token}`,
        },
      });
      
      const episodeData = await episodeResponse.json();
      console.log('Episode response:', episodeData);
      console.log('✅ API connection working');
    } else {
      console.log('❌ Failed to get JWT token');
    }
  } catch (error) {
    console.log('❌ API test failed:', error.message);
  }
}

testAPI();