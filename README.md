# 🎬 Dad's Magic App - Dual App System

A real-time dual-app system featuring a customer-facing movie selection app and a magician-facing display app with instant synchronization.

## ✨ Features

### 🖥️ Customer App (Desktop)
- Browse and search movies from TMDB
- Real-time movie selection
- Clean, modern UI
- Genre-based filtering
- Movie details and ratings

### 🎩 Magician App (Phone)
- Real-time display of customer selections
- Connection status indicator
- Clean black interface
- Instant movie poster updates
- Professional presentation view

### 🔄 Real-time Communication
- Socket.IO-based synchronization
- Instant updates between apps
- Room-based broadcasting
- Reliable connection handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS/Android device or simulator

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd Dad_MagicApp_002
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

3. **Start the socket server**
   ```bash
   cd server
   npm start
   ```

4. **Start the Expo app**
   ```bash
   npx expo start --lan --web --port 19000
   ```

## 🌐 Access URLs

- **Customer App (Desktop)**: `http://192.168.1.99:19006`
- **Magician App (Phone)**: `http://192.168.1.99:19006/Magician`
- **Socket Server**: `http://192.168.1.99:3001`

## 📱 How It Works

1. **Customer selects a movie** on the desktop app
2. **Socket.IO emits** the selection to the server
3. **Server broadcasts** to all connected clients
4. **Magician app receives** the update instantly
5. **Movie poster displays** on the magician screen

## 🏗️ Architecture

```
Customer App (Desktop) ←→ Socket.IO Server ←→ Magician App (Phone)
     ↓                           ↓                    ↓
  React Native              Node.js +           React Native
  + Expo Web              Socket.IO            + Expo Web
```

## 📁 Project Structure

```
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Customer app main screen
│   │   ├── MagicianScreen.js      # Magician app screen
│   │   ├── GenreScreen.js         # Genre selection
│   │   └── MovieDetailScreen.js   # Movie details
│   ├── services/
│   │   ├── socketService.js       # Socket.IO client
│   │   └── tmdbService.js         # TMDB API integration
│   └── components/
│       └── MovieModal.js          # Movie selection modal
├── server/
│   ├── socketServer.js            # Socket.IO server
│   └── package.json
├── App.js                         # Main app router
└── package.json
```

## 🔧 Configuration

### Socket Server
- Port: 3001
- Room: `default-room`
- Events: `select-movie`, `movie-selected`

### TMDB Integration
- API key required
- Movie data source
- Poster image URLs

## 🎯 Use Cases

- **Magic Shows**: Audience selects movies, magician sees selections
- **Interactive Presentations**: Real-time audience participation
- **Live Events**: Instant feedback and selection display
- **Educational**: Student choice visualization

## 🚨 Troubleshooting

### Common Issues
1. **Socket connection failed**: Check if server is running on port 3001
2. **Movies not updating**: Verify socket server is accessible from client IP
3. **Blank magician screen**: Check browser console for errors

### Debug Commands
```bash
# Check socket server status
lsof -i :3001

# Restart socket server
pkill -f "socketServer.js" && cd server && npm start

# Clear Expo cache
npx expo start --clear
```

## 📝 Version History

- **v1.0.0** (2025-08-15): Working dual-app system with real-time synchronization
  - Customer app with movie browsing
  - Magician app with live updates
  - Socket.IO real-time communication
  - Clean UI without debug elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- TMDB for movie data
- Socket.IO for real-time communication
- Expo for cross-platform development
- React Native community

---

**Status**: ✅ **WORKING VERSION** - Ready for production use!
