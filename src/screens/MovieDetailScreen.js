import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MovieDetailScreen({ route, navigation }) {
  const { movie } = route.params;

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No movie data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`,
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Movie Info Section */}
        <View style={styles.movieInfoSection}>
          <View style={styles.posterRow}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <View style={styles.basicInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieYear}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
              <Text style={styles.movieRuntime}>
                {movie.runtime ? `${movie.runtime} min` : 'Runtime not available'}
              </Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </Text>
              </View>
            </View>
          </View>

          {/* Overview */}
          {movie.overview && (
            <View style={styles.overviewSection}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overviewText}>{movie.overview}</Text>
            </View>
          )}

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresSection}>
              <Text style={styles.sectionTitle}>Genres</Text>
              <View style={styles.genresList}>
                {movie.genres.map((genre, index) => (
                  <View key={genre.id} style={styles.genreTag}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Additional Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Release Date:</Text>
              <Text style={styles.detailValue}>
                {new Date(movie.release_date).toLocaleDateString()}
              </Text>
            </View>
            {movie.budget && movie.budget > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Budget:</Text>
                <Text style={styles.detailValue}>
                  ${(movie.budget / 1000000).toFixed(1)}M
                </Text>
              </View>
            )}
            {movie.revenue && movie.revenue > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Revenue:</Text>
                <Text style={styles.detailValue}>
                  ${(movie.revenue / 1000000).toFixed(1)}M
                </Text>
              </View>
            )}
            {movie.status && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>{movie.status}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: height * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieInfoSection: {
    padding: 20,
  },
  posterRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  basicInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  movieYear: {
    fontSize: 18,
    color: '#888',
    marginBottom: 4,
  },
  movieRuntime: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
    marginLeft: 4,
    fontWeight: '600',
  },
  overviewSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  genresSection: {
    marginBottom: 24,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailLabel: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '400',
  },
});
