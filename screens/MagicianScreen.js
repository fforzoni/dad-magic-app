import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { socketService } from '../services/socketService';

export default function MagicianScreen() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setupSocketConnection();
    
    return () => {
      socketService.disconnect();
    };
  }, []);

  const setupSocketConnection = () => {
    console.log('🎩 Setting up socket connection for magician...');
    
    // Set up movie selection callback FIRST
    console.log('📞 Setting up movie selection callback...');
    socketService.onMovieSelected((movie) => {
      console.log('🎬 MOVIE SELECTED CALLBACK TRIGGERED!');
      console.log('Movie data received:', movie);
      setSelectedMovie(movie);
    });
    
    // Now connect to socket
    console.log('🔌 Connecting to socket server...');
    socketService.connect();
    
    // Check connection status immediately
    const checkConnection = setInterval(() => {
      const status = socketService.getConnectionStatus();
      console.log('📡 Socket connection status:', status);
      setIsConnected(status);
      
      if (status) {
        console.log('✅ Socket connected successfully!');
        clearInterval(checkConnection);
      }
    }, 1000);
    
    socketService.onConnect(() => {
      console.log('🎉 Magician connected to customer app');
      setIsConnected(true);
    });

    socketService.onDisconnect(() => {
      console.log('❌ Magician disconnected from customer app');
      setIsConnected(false);
    });
    
    console.log('🎩 Socket setup complete for magician');
  };

  const renderMovieSelection = () => {
    if (!selectedMovie) {
      return (
        <View style={styles.noSelectionContainer}>
          <Text style={styles.noSelectionText}>🎬</Text>
          <Text style={styles.noSelectionTitle}>Waiting for Movie Selection</Text>
          <Text style={styles.noSelectionSubtitle}>
            Tap any movie on the customer app to see it here live!
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.movieContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
        
        <Text style={styles.movieTitle}>{selectedMovie.title}</Text>
        <Text style={styles.movieYear}>
          {new Date(selectedMovie.release_date).getFullYear()}
        </Text>
        <Text style={styles.movieRating}>⭐ {selectedMovie.vote_average}/10</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (Platform.OS === 'web') {
              window.location.href = '/';
            }
          }}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>🎩 Magician View</Text>
        
        <View style={styles.connectionStatus}>
          <View style={[styles.statusDot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
          <Text style={styles.statusText}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderMovieSelection()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  backButton: {
    backgroundColor: '#404040',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#ffffff',
  },

  content: {
    flex: 1,
    padding: 20,
  },
  noSelectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noSelectionText: {
    fontSize: 80,
    marginBottom: 20,
  },
  noSelectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  noSelectionSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  movieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  moviePoster: {
    width: 300,
    height: 450,
    borderRadius: 15,
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  movieYear: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 10,
  },
  movieRating: {
    fontSize: 18,
    color: '#FFD700',
  },
});
