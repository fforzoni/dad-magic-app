import axios from 'axios';

// TMDB API Configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '462b797169ca3170f8971775670b86ac'; // Your actual API key

// Create axios instance with base configuration
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

// Get all movie genres
export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    const genres = response.data.genres;
    
    // Get movie count for each genre (optional enhancement)
    const genresWithCount = await Promise.all(
      genres.map(async (genre) => {
        try {
          const moviesResponse = await tmdbApi.get('/discover/movie', {
            params: {
              with_genres: genre.id,
              page: 1,
            },
          });
          return {
            ...genre,
            movieCount: moviesResponse.data.total_results,
          };
        } catch (error) {
          console.error(`Error getting count for genre ${genre.name}:`, error);
          return { ...genre, movieCount: 0 };
        }
      })
    );
    
    return genresWithCount;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1, limit = 20) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page: page,
        include_adult: false,
        include_video: false,
      },
    });
    
    // Limit results to specified number (default 20, max 50)
    const limitedResults = response.data.results.slice(0, Math.min(limit, 50));
    return limitedResults;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,images',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query: query,
        page: page,
        include_adult: false,
      },
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: {
        page: page,
      },
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: {
        page: page,
      },
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: {
        page: page,
      },
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Get movie by specific ID
export const getMovieById = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);
    return null;
  }
};

// Get multiple movies by their IDs
export const getMoviesByIds = async (movieIds) => {
  try {
    const moviePromises = movieIds.map(id => getMovieById(id));
    const movies = await Promise.all(moviePromises);
    return movies.filter(movie => movie !== null);
  } catch (error) {
    console.error('Error fetching movies by IDs:', error);
    return [];
  }
};
