import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MovieModal({ visible, movie, onClose }) {
  if (!movie) return null;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.8}
    >
      <View style={styles.modalContent}>
        {/* Header with close button */}
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
          {/* Movie Poster */}
          <View style={styles.posterContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.posterImage}
              resizeMode="cover"
            />
          </View>

          {/* Movie Info */}
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            
            <View style={styles.metaInfo}>
              <Text style={styles.movieYear}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
              {movie.vote_average && (
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </View>
              )}
            </View>

            {/* Overview */}
            {movie.overview && (
              <View style={styles.overviewSection}>
                <Text style={styles.overviewTitle}>Overview</Text>
                <Text style={styles.overviewText}>{movie.overview}</Text>
              </View>
            )}

            {/* Additional Details */}
            <View style={styles.detailsSection}>
              {movie.runtime && (
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#888" />
                  <Text style={styles.detailText}>{movie.runtime} min</Text>
                </View>
              )}
              
              {movie.original_language && (
                <View style={styles.detailRow}>
                  <Ionicons name="language-outline" size={16} color="#888" />
                  <Text style={styles.detailText}>
                    {movie.original_language.toUpperCase()}
                  </Text>
                </View>
              )}

              {movie.popularity && (
                <View style={styles.detailRow}>
                  <Ionicons name="trending-up-outline" size={16} color="#888" />
                  <Text style={styles.detailText}>
                    Popularity: {movie.popularity.toFixed(0)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    maxHeight: height * 0.8,
    minHeight: height * 0.5,
    width: Math.min(width - 40, 400), // Responsive width with max 400px
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  posterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  posterImage: {
    width: Math.min(width * 0.3, 150),
    height: Math.min(width * 0.45, 225),
    borderRadius: 12,
  },
  movieInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  movieTitle: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  movieYear: {
    fontSize: 18,
    color: '#888',
    marginRight: 16,
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
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    textAlign: 'justify',
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#ccc',
    marginLeft: 12,
  },
});
