import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMoviesByGenre } from '../services/tmdbService';
import { socketService } from '../services/socketService';
import MovieModal from '../components/MovieModal';

const { width } = Dimensions.get('window');
const numColumns = 3;
const itemWidth = (width - 80) / numColumns;
const POSTER_HEIGHT = itemWidth * 1.5; // Keep proportional height

export default function GenreScreen({ route, navigation }) {
  const { genreId, genreName } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadMovies();
    setupSocketConnection();
    
    return () => {
      socketService.disconnect();
    };
  }, [genreId]);

  const setupSocketConnection = () => {
    socketService.connect();
    socketService.onMovieSelected((movie) => {
      // This will be used by the magician app
      console.log('Movie selected by customer:', movie);
    });
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await getMoviesByGenre(genreId, 1, 50); // Limit to top 50 movies
      setMovies(moviesData);
    } catch (error) {
      console.error('Error loading movies:', error);
      Alert.alert('Error', 'Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
    
    // Send movie selection to magician app via socket
    socketService.selectMovie(movie);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => handleMoviePress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.moviePoster}
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
      
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.movieMeta}>
          <Text style={styles.movieYear}>
            {new Date(item.release_date).getFullYear()}
          </Text>
          {item.vote_average && (
            <Text style={styles.movieRating}>
              ★ {item.vote_average.toFixed(1)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

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
      <View style={styles.header}>
        <Text style={styles.genreTitle}>{genreName}</Text>
        <Text style={styles.movieCount}>{movies.length} movies</Text>
      </View>
      
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.moviesList}
        showsVerticalScrollIndicator={false}
        onRefresh={loadMovies}
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  genreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  movieCount: {
    fontSize: 16,
    color: '#888',
  },
  moviesList: {
    padding: 20,
  },
  movieItem: {
    width: itemWidth,
    margin: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  moviePoster: {
    width: '100%',
    height: POSTER_HEIGHT,
    position: 'relative',
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
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieYear: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  movieRating: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
