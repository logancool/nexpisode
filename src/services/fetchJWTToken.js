const TVDB_API_HOST =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.REACT_APP_TVDB_API_HOST;
const TVDB_API_KEY = process.env.REACT_APP_TVDB_API_KEY;
const TVDB_API_PIN = process.env.REACT_APP_TVDB_API_PIN;

const data = {
  apikey: TVDB_API_KEY,
  pin: TVDB_API_PIN,
};

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json',
};

async function fetchJWTToken() {
  try {
    const response = await fetch(`${TVDB_API_HOST}/v4/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.log('JWT token error');
    throw new Error(err);
  }
}

export default fetchJWTToken;
