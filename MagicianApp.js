import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { socketService } from './src/services/socketService';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MagicianApp() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('default-room');

  useEffect(() => {
    setupSocketConnection();
    
    return () => {
      socketService.disconnect();
    };
  }, []);

  const setupSocketConnection = () => {
    socketService.connect(roomId);
    
    socketService.onMovieSelected((movie) => {
      console.log('Movie selected by customer:', movie.title);
      setSelectedMovie(movie);
    });

    // Monitor connection status
    const checkConnection = setInterval(() => {
      const status = socketService.getConnectionStatus();
      setIsConnected(status);
    }, 1000);

    return () => clearInterval(checkConnection);
  };

  const changeRoom = () => {
    const newRoomId = prompt('Enter new room ID:') || 'default-room';
    setRoomId(newRoomId);
    socketService.changeRoom(newRoomId);
  };

  const clearSelection = () => {
    setSelectedMovie(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>Magician Viewer</Text>
          <Text style={styles.roomInfo}>Room: {roomId}</Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.connectionStatus}>
            <View style={[styles.statusDot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
            <Text style={styles.statusText}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.changeRoomButton} onPress={changeRoom}>
            <Ionicons name="swap-horizontal" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {selectedMovie ? (
          <View style={styles.movieDisplay}>
            {/* Movie Poster */}
            <View style={styles.posterContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`,
                }}
                style={styles.moviePoster}
                resizeMode="cover"
              />
            </View>

            {/* Movie Information */}
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{selectedMovie.title}</Text>
              
              <View style={styles.movieMeta}>
                <Text style={styles.movieYear}>
                  {new Date(selectedMovie.release_date).getFullYear()}
                </Text>
                {selectedMovie.vote_average && (
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={20} color="#FFD700" />
                    <Text style={styles.rating}>
                      {selectedMovie.vote_average.toFixed(1)}
                    </Text>
                  </View>
                )}
              </View>

              {selectedMovie.overview && (
                <View style={styles.overviewSection}>
                  <Text style={styles.overviewTitle}>Overview</Text>
                  <Text style={styles.overviewText}>{selectedMovie.overview}</Text>
                </View>
              )}

              {/* Additional Details */}
              <View style={styles.detailsGrid}>
                {selectedMovie.runtime && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={18} color="#888" />
                    <Text style={styles.detailText}>{selectedMovie.runtime} min</Text>
                  </View>
                )}
                
                {selectedMovie.original_language && (
                  <View style={styles.detailItem}>
                    <Ionicons name="language-outline" size={18} color="#888" />
                    <Text style={styles.detailText}>
                      {selectedMovie.original_language.toUpperCase()}
                    </Text>
                  </View>
                )}

                {selectedMovie.popularity && (
                  <View style={styles.detailItem}>
                    <Ionicons name="trending-up-outline" size={18} color="#888" />
                    <Text style={styles.detailText}>
                      {selectedMovie.popularity.toFixed(0)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Clear Button */}
            <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
              <Ionicons name="close-circle" size={24} color="#fff" />
              <Text style={styles.clearButtonText}>Clear Selection</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.waitingState}>
            <Ionicons name="film-outline" size={80} color="#333" />
            <Text style={styles.waitingTitle}>Waiting for Customer Selection</Text>
            <Text style={styles.waitingSubtitle}>
              When a customer selects a movie, it will appear here in real-time
            </Text>
            
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionInfoText}>
                Connection Status: {isConnected ? 'Active' : 'Inactive'}
              </Text>
              <Text style={styles.connectionInfoText}>
                Room: {roomId}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Magician Viewer App - Real-time Movie Selection
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  roomInfo: {
    fontSize: 14,
    color: '#888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#888',
  },
  changeRoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  movieDisplay: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  posterContainer: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  moviePoster: {
    width: 300,
    height: 450,
    borderRadius: 20,
  },
  movieInfo: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  movieTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 38,
  },
  movieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  movieYear: {
    fontSize: 20,
    color: '#888',
    marginRight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginLeft: 6,
    fontWeight: '600',
  },
  overviewSection: {
    width: '100%',
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  overviewText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    textAlign: 'center',
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  waitingState: {
    alignItems: 'center',
    padding: 40,
  },
  waitingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  waitingSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  connectionInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 12,
  },
  connectionInfoText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
