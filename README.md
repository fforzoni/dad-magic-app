# 🎬 Dad's Magic Movie App

A real-time movie selection app that connects customers and magicians through live WebSocket communication.

## 🌟 Features

- **Real-time Communication**: WebSocket-based live updates between customer and magician views
- **Beautiful UI**: Modern, responsive design with movie posters and smooth animations
- **Cross-platform**: Works on desktop and mobile devices
- **Live Updates**: Instant movie selection display on magician view

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/fforzoni/dad-magic-app.git
   cd dad-magic-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

3. **Start the services**
   ```bash
   # Terminal 1: Start socket server
   cd server && npm start
   
   # Terminal 2: Start Expo app
   npm start
   
   # Terminal 3: Start static HTML server
   cd public && python3 -m http.server 3000
   ```

4. **Access the app**
   - **Customer View**: `http://localhost:19006/` (Expo) or `http://localhost:3000/customer.html`
   - **Magician View**: `http://localhost:3000/magician.html`
   - **Socket Server**: `http://localhost:3001`

### Network Access (for iPhone testing)

- **Customer View**: `http://192.168.1.99:19006/`
- **Magician View**: `http://192.168.1.99:3000/magician.html`
- **Socket Server**: `http://192.168.1.99:3001`

## 📱 How It Works

1. **Customer View**: Browse and select movies from a collection of posters
2. **Real-time Selection**: Selected movies are instantly sent via WebSocket
3. **Magician View**: Displays the currently selected movie in real-time
4. **Live Updates**: Every selection is shown immediately on the magician view

## 🛠️ Tech Stack

- **Frontend**: React Native (Expo), HTML/CSS/JavaScript
- **Backend**: Node.js, Express, Socket.IO
- **Real-time**: WebSocket communication
- **Styling**: Modern CSS with gradients and animations

## 🌐 GitHub Pages Setup

To deploy this app on GitHub Pages:

1. **Go to repository settings**: `https://github.com/fforzoni/dad-magic-app/settings`
2. **Click "Pages"** in the left sidebar
3. **Source**: Select "Deploy from a branch"
4. **Branch**: Choose `main` or `master`
5. **Folder**: Select `/ (root)`
6. **Click "Save"**

The app will be available at: `https://fforzoni.github.io/dad-magic-app/`

## 📁 Project Structure

```
dad-magic-app/
├── public/                 # Static HTML files
│   ├── customer.html      # Customer view interface
│   ├── magician.html      # Magician view interface
│   └── index.html         # Landing page
├── server/                 # Socket server backend
│   ├── socketServer.js    # WebSocket server
│   └── package.json       # Server dependencies
├── src/                    # React Native source code
│   ├── screens/           # App screens
│   └── services/          # Socket service
└── index.html             # GitHub Pages landing page
```

## 🔧 Configuration

- **Socket Server Port**: 3001
- **Expo Web Port**: 19006
- **Static Server Port**: 3000
- **Network IP**: 192.168.1.99 (your local IP)

## 📱 Testing

### Desktop Testing
- Open customer view in one tab
- Open magician view in another tab
- Select movies and watch real-time updates

### iPhone Testing
- Connect iPhone to same WiFi network
- Access customer view: `http://192.168.1.99:19006/`
- Access magician view: `http://192.168.1.99:3000/magician.html`
- Test real-time communication

## 🎯 Current Status

- ✅ **Socket Server**: Running and functional
- ✅ **Customer View**: Working with movie posters
- ✅ **Magician View**: Real-time updates working
- ✅ **Local Network**: Accessible from iPhone
- 🚧 **GitHub Pages**: Setup in progress

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for Dad's Magic Movie App**
