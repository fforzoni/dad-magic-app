import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import GenreScreen from './src/screens/GenreScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import MagicianScreen from './src/screens/MagicianScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  useEffect(() => {
    // Handle URL routing for web
    if (Platform.OS === 'web') {
      const updateScreen = () => {
        const path = window.location.pathname;
        console.log('🔍 URL changed to:', path);
        
        let screen = 'Home';
        if (path === '/Magician') {
          screen = 'Magician';
        } else if (path === '/Genre') {
          screen = 'Genre';
        } else if (path === '/MovieDetail') {
          screen = 'MovieDetail';
        }
        
        console.log('🎯 Setting screen to:', screen);
        setCurrentScreen(screen);
      };

      // Set initial screen
      updateScreen();

      // Listen for URL changes
      window.addEventListener('popstate', updateScreen);
      
      // Also check URL periodically in case direct navigation doesn't trigger popstate
      const interval = setInterval(updateScreen, 1000);
      
      return () => {
        window.removeEventListener('popstate', updateScreen);
        clearInterval(interval);
      };
    }
  }, []);

  const renderScreen = () => {
    console.log('🎬 Rendering screen:', currentScreen);
    
    switch (currentScreen) {
      case 'Magician':
        return <MagicianScreen />;
      case 'Genre':
        return <GenreScreen route={{ params: {} }} />;
      case 'MovieDetail':
        return <MovieDetailScreen route={{ params: {} }} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
