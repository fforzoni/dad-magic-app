import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGenres, getMoviesByGenre, searchMovies, getTopRatedMovies, getMovieDetails, getMoviesByIds } from '../services/tmdbService';
import { socketService } from '../services/socketService';
import MovieModal from '../components/MovieModal';
import { getPriorityMoviesByGenre } from '../data/priorityMovies';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = 156; // 30% larger (120 * 1.3)
const POSTER_HEIGHT = 234; // 30% larger (180 * 1.3)

export default function HomeScreen({ navigation }) {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    loadGenresAndMovies();
    setupSocketConnection();
    
    return () => {
      socketService.disconnect();
    };
  }, []);

  const setupSocketConnection = () => {
    socketService.connect();
    socketService.onMovieSelected((movie) => {
      console.log('Movie selected by customer:', movie);
    });
  };



  const loadGenresAndMovies = async () => {
    try {
      setLoading(true);
      
      // Get top 10 highest-rated movies of all time for featured section
      try {
        const topMovies = await getTopRatedMovies(1, 50); // Get more movies to choose from
        const allTimeTopMovies = topMovies
          .sort((a, b) => b.vote_average - a.vote_average) // Sort by rating (highest first)
          .slice(0, 10); // Take top 10
        console.log('Loaded featured movies:', allTimeTopMovies.length, allTimeTopMovies.map(m => m.title));
        setFeaturedMovies(allTimeTopMovies);
      } catch (error) {
        console.error('Error loading featured movies:', error);
        setFeaturedMovies([]);
      }
      
      // Get all genres
      const genresData = await getGenres();
      setGenres(genresData);
      
      // Load movies for each genre and ensure no duplicates
      const moviesData = {};
      const usedMovieIds = new Set(); // Track which movies have been assigned
      
      // Filter out unwanted genres and combine Family & Animation
      const filteredGenres = genresData.filter(genre => 
        genre.name !== 'Documentary' && 
        genre.name !== 'TV Movie'
      );
      
      // Sort genres by popularity/importance to prioritize them
      const priorityGenres = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Romance', 'Adventure', 'Sci-Fi', 'Family & Animation', 'Fantasy', 'Musical', 'Crime'];
      const sortedGenres = [...filteredGenres].sort((a, b) => {
        const aPriority = priorityGenres.indexOf(a.name);
        const bPriority = priorityGenres.indexOf(b.name);
        if (aPriority === -1 && bPriority === -1) return 0;
        if (aPriority === -1) return 1;
        if (bPriority === -1) return -1;
        return aPriority - bPriority;
      });
      
      // Handle Family & Animation combination first
      const familyGenre = filteredGenres.find(g => g.name === 'Family');
      const animationGenre = filteredGenres.find(g => g.name === 'Animation');
      
      if (familyGenre || animationGenre) {
        try {
          // Get priority movies for Family & Animation first
          const priorityMoviesForGenre = getPriorityMoviesByGenre('Family & Animation');
          let finalGenreMovies = [];
          
          if (priorityMoviesForGenre.length > 0) {
            const priorityMovieIds = priorityMoviesForGenre.map(movie => movie.tmdbId);
            const priorityMovies = await getMoviesByIds(priorityMovieIds);
            finalGenreMovies = priorityMovies;
            priorityMovies.forEach(movie => usedMovieIds.add(movie.id));
          }
          
          // Get regular movies from both genres
          let allMovies = [];
          if (familyGenre) {
            const familyMovies = await getMoviesByGenre(familyGenre.id, 1, 50);
            allMovies = [...allMovies, ...familyMovies];
          }
          
          if (animationGenre) {
            const animationMovies = await getMoviesByGenre(animationGenre.id, 1, 50);
            allMovies = [...allMovies, ...animationMovies];
          }
          
          // Remove duplicates
          const uniqueMovies = allMovies.filter((movie, index, self) => 
            index === self.findIndex(m => m.id === movie.id)
          );
          
          // Add remaining available movies (up to 50 total)
          const remainingSlots = 50 - finalGenreMovies.length;
          const additionalMovies = uniqueMovies
            .filter(movie => !usedMovieIds.has(movie.id))
            .slice(0, remainingSlots);
          
          finalGenreMovies = [...finalGenreMovies, ...additionalMovies];
          
          // Mark additional movies as used
          additionalMovies.forEach(movie => usedMovieIds.add(movie.id));
          
          moviesData['Family & Animation'] = finalGenreMovies;
        } catch (error) {
          console.error('Error loading Family & Animation movies:', error);
          moviesData['Family & Animation'] = [];
        }
      }
      
      // Process other genres
      for (const genre of sortedGenres) {
        // Skip Family and Animation as they're handled above
        if (genre.name === 'Family' || genre.name === 'Animation') {
          continue;
        }
        
        try {
          // Get priority movies for this genre first
          const priorityMoviesForGenre = getPriorityMoviesByGenre(genre.name);
          
          // Fetch priority movies directly by their IDs to guarantee they appear
          let finalGenreMovies = [];
          if (priorityMoviesForGenre.length > 0) {
            const priorityMovieIds = priorityMoviesForGenre.map(movie => movie.tmdbId);
            const priorityMovies = await getMoviesByIds(priorityMovieIds);
            finalGenreMovies = priorityMovies;
            priorityMovies.forEach(movie => usedMovieIds.add(movie.id));
          }
          
          // Get regular movies for this genre
          const allMovies = await getMoviesByGenre(genre.id, 1, 100);
          
          // Add remaining available movies (up to 50 total)
          const remainingSlots = 50 - finalGenreMovies.length;
          const additionalMovies = allMovies
            .filter(movie => !usedMovieIds.has(movie.id))
            .slice(0, remainingSlots);
          
          finalGenreMovies = [...finalGenreMovies, ...additionalMovies];
          
          // Mark additional movies as used
          additionalMovies.forEach(movie => usedMovieIds.add(movie.id));
          
          moviesData[genre.id] = finalGenreMovies;
        } catch (error) {
          console.error(`Error loading movies for genre ${genre.name}:`, error);
          moviesData[genre.id] = [];
        }
      }
      
      setMoviesByGenre(moviesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    console.log('🎬 MOVIE SELECTED BY CUSTOMER:', movie.title);
    console.log('Full movie object:', movie);
    setSelectedMovie(movie);
    setModalVisible(true);
    
    // Send movie selection to magician app via socket
    console.log('📡 Sending movie selection to magician app...');
    const result = socketService.selectMovie(movie);
    console.log('Socket send result:', result);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await searchMovies(query, 1);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const renderMoviePoster = ({ item }) => (
    <TouchableOpacity
      style={styles.moviePoster}
      onPress={() => handleMoviePress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.posterImage}
        resizeMode="cover"
      />
      
      {/* Rating Badge */}
      {item.vote_average && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ★ {item.vote_average.toFixed(1)}
          </Text>
        </View>
      )}
      
      {/* Movie Info Overlay */}
      <View style={styles.posterOverlay}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderGenreSection = ({ item: genre }) => {
    // Handle combined Family & Animation genre
    let genreKey;
    let displayName;
    
    if (genre.name === 'Family' || genre.name === 'Animation') {
      genreKey = 'Family & Animation';
      displayName = 'Family & Animation';
    } else {
      genreKey = genre.id;
      displayName = genre.name;
    }
    
    const movies = moviesByGenre[genreKey] || [];
    
    if (movies.length === 0) return null;

    return (
      <View style={styles.genreSection}>
        <View style={styles.genreHeader}>
          <View style={styles.genreTitleRow}>
            <Text style={styles.genreTitle}>
              {displayName}
            </Text>
          </View>
          <Text style={styles.movieCount}>{movies.length} movies</Text>
        </View>
        
        <FlatList
          data={movies}
          renderItem={renderMoviePoster}
          keyExtractor={(movie) => movie.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moviesRow}
          snapToInterval={POSTER_WIDTH + 16}
          decelerationRate="fast"
        />
      </View>
    );
  };



  const renderFeaturedMovies = () => {
    console.log('Rendering Featured Movies, featuredMovies length:', featuredMovies.length);
    if (featuredMovies.length === 0) {
      console.log('No featured movies to display');
      return null;
    }

    return (
      <View style={styles.featuredSection}>
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredTitle}>Featured Movies</Text>
          <Text style={styles.featuredSubtitle}>Top 10 Highest-Rated Films of All Time</Text>
        </View>
        
        <FlatList
          data={featuredMovies}
          renderItem={renderMoviePoster}
          keyExtractor={(movie) => movie.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moviesRow}
          snapToInterval={POSTER_WIDTH + 16}
          decelerationRate="fast"
        />
      </View>
    );
  };



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Yellow IMDB Header */}
      <View style={styles.imdbHeader}>
        <Text style={styles.imdbTitle}>IMBD</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isSearching && (
            <ActivityIndicator size="small" color="#000" style={styles.searchSpinner} />
          )}
        </View>
        

        

      </View>
      
      {/* Search Results Dropdown - Positioned as absolute overlay */}
      {searchQuery.trim().length > 0 && searchResults.length > 0 && (
        <View style={styles.searchDropdownOverlay}>
          <View style={styles.searchDropdown}>
            <FlatList
              data={searchResults.slice(0, 8)} // Show max 8 results
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    handleMoviePress(item);
                  }}
                >
                  <Text style={styles.searchResultTitle}>{item.title}</Text>
                  <Text style={styles.searchResultYear}>
                    {new Date(item.release_date).getFullYear()}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            />
          </View>
        </View>
      )}
      
      {/* Content - Always show genres, search only shows dropdown */}
      <FlatList
        data={['featured', ...genres]} // Add featured section at the top
        renderItem={({ item, index }) => {
          if (item === 'featured') {
            return renderFeaturedMovies();
          }
          return renderGenreSection({ item });
        }}
        keyExtractor={(item, index) => {
          if (item === 'featured') return 'featured';
          return item.id.toString();
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.genresList}
        onRefresh={loadGenresAndMovies}
        refreshing={loading}
      />

      <MovieModal
        visible={modalVisible}
        movie={selectedMovie}
        onClose={() => {
          setModalVisible(false);
          setSelectedMovie(null);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
  },
  imdbHeader: {
    backgroundColor: '#F5C518', // IMDB yellow
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imdbTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 2,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 9999,
  },


  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchSpinner: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  searchDropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
    elevation: 999999,
    pointerEvents: 'box-none',
  },
  searchDropdown: {
    position: 'absolute',
    top: 120, // Position below the header
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    maxHeight: 300,
    zIndex: 999999,
  },
  searchResultItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchResultTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  searchResultYear: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },

  featuredSection: {
    marginBottom: 30,
  },
  featuredHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  genresList: {
    paddingBottom: 20,
  },
  genreSection: {
    marginBottom: 30,
  },
  genreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  genreTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 12,
  },

  movieCount: {
    fontSize: 14,
    color: '#888',
  },
  moviesRow: {
    paddingHorizontal: 20,
  },
  moviePoster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  posterOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 12,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
    lineHeight: 16,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieYear: {
    fontSize: 11,
    color: '#ccc',
    fontWeight: '500',
  },
  movieRating: {
    fontSize: 11,
    color: '#FFD700',
    fontWeight: 'bold',
  },

});
