// Example configuration file
// Copy this to config.js and update with your actual values

export const config = {
  // TMDB API Configuration
  // Get your API key from: https://www.themoviedb.org/settings/api
  TMDB_API_KEY: 'your_tmdb_api_key_here',
  
  // Socket Server Configuration
  // URL where your socket server is running
  SOCKET_SERVER_URL: 'http://localhost:3001',
  
  // App Configuration
  NODE_ENV: 'development',
  
  // Optional: Customize these values
  TMDB_LANGUAGE: 'en-US',
  TMDB_REGION: 'US',
  SOCKET_SERVER_PORT: 3001,
  
  // Default room for socket connections
  DEFAULT_ROOM_ID: 'default-room',
  
  // API endpoints
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  
  // Image quality settings
  POSTER_QUALITY: 'w500', // w92, w154, w185, w342, w500, w780, original
  BACKDROP_QUALITY: 'original', // w300, w780, w1280, original
};

// Usage in your app:
// import { config } from './config';
// const apiKey = config.TMDB_API_KEY;
