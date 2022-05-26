export const BASE_URL = 'https://api.spotify.com/v1';

export const getToken = () => window.localStorage.getItem(token) || null;
