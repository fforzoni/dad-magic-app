# Dad Magic Movie App 🎬✨

A React Native app that displays movie posters from TMDB organized by genre, with real-time synchronization between a customer app and a magician viewer app.

## Features

- **Customer App**: Browse movies by genre, tap posters for detailed information
- **Magician Viewer App**: Real-time display of customer movie selections
- **TMDB Integration**: Fetches movie data from The Movie Database API
- **Real-time Communication**: Socket.IO-based synchronization between apps
- **Beautiful UI**: Modern, dark-themed interface with smooth animations

## App Structure

```
Dad_MagicApp_002/
├── App.js                          # Main customer app entry point
├── MagicianApp.js                 # Magician viewer app
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js         # Genre selection screen
│   │   ├── GenreScreen.js        # Movie grid by genre
│   │   └── MovieDetailScreen.js  # Full movie details
│   ├── components/
│   │   └── MovieModal.js         # Movie info popup
│   └── services/
│       ├── tmdbService.js        # TMDB API integration
│       └── socketService.js      # Real-time communication
├── server/
│   ├── socketServer.js           # Socket.IO server
│   └── package.json              # Server dependencies
└── package.json                  # Main app dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- TMDB API key
- iOS Simulator or Android Emulator (or physical device)

## Setup Instructions

### 1. Get TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Replace `YOUR_TMDB_API_KEY` in `src/services/tmdbService.js`

### 2. Install Dependencies

```bash
# Install main app dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Start the Socket Server

```bash
cd server
npm start
# or for development with auto-restart:
npm run dev
```

The server will run on `http://localhost:3001`

### 4. Start the Customer App

```bash
# In a new terminal
npm start
# or
expo start
```

### 5. Start the Magician Viewer App

```bash
# In another terminal
npx expo start --dev-client
# Then select MagicianApp.js as the entry point
```

## Usage

### Customer App

1. **Browse Genres**: Select from available movie genres
2. **View Movies**: See movie posters organized by genre
3. **Select Movie**: Tap any poster to see movie details
4. **Real-time Sync**: Your selection appears instantly on the magician app

### Magician Viewer App

1. **Wait for Selection**: App shows waiting state until customer selects a movie
2. **View Selection**: Selected movie appears prominently with full details
3. **Room Management**: Change rooms to handle multiple customer sessions
4. **Clear Selection**: Reset to waiting state for next selection

## Configuration

### Changing Socket Server URL

Update the server URL in `src/services/socketService.js`:

```javascript
const SOCKET_SERVER_URL = 'http://your-server-url:3001';
```

### Room Management

- Default room: `default-room`
- Change rooms using the room switcher in the magician app
- Each room operates independently

### TMDB API Customization

Modify `src/services/tmdbService.js` to:
- Change language settings
- Adjust movie sorting
- Add more API endpoints

## API Endpoints

### Socket Server

- `GET /health` - Server health check
- `GET /status` - Current connection status
- `GET /rooms/:roomId` - Room information

### TMDB API

- Movie genres
- Movies by genre
- Movie details
- Search functionality
- Popular/Top rated movies

## Troubleshooting

### Common Issues

1. **Socket Connection Failed**
   - Ensure socket server is running
   - Check server URL in socketService.js
   - Verify network connectivity

2. **TMDB API Errors**
   - Verify API key is correct
   - Check API key permissions
   - Ensure internet connection

3. **App Not Loading**
   - Clear Expo cache: `expo start -c`
   - Restart Metro bundler
   - Check for JavaScript errors

### Debug Mode

Enable debug logging in socketService.js:

```javascript
// Add this line for detailed logging
console.log('Socket events:', socket.eventNames());
```

## Development

### Adding New Features

1. **New Screens**: Add to `src/screens/` and update navigation
2. **New Components**: Create in `src/components/`
3. **New Services**: Add to `src/services/`

### Styling

- Uses React Native StyleSheet
- Dark theme with consistent color palette
- Responsive design for different screen sizes

### Testing

- Test on both iOS and Android
- Verify real-time synchronization
- Check error handling and edge cases

## Deployment

### Production Considerations

1. **Socket Server**: Deploy to cloud service (Heroku, AWS, etc.)
2. **API Keys**: Use environment variables for production
3. **Error Handling**: Implement proper logging and monitoring
4. **Performance**: Optimize image loading and API calls

### Environment Variables

```bash
# Server
PORT=3001
NODE_ENV=production

# App
TMDB_API_KEY=your_api_key
SOCKET_SERVER_URL=your_production_url
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the troubleshooting section
- Review console logs for errors
- Ensure all dependencies are properly installed

---

**Note**: This app requires a TMDB API key and a running socket server to function properly. Make sure both are configured before testing.
