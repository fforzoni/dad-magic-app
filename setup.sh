#!/bin/bash

echo "🎬 Setting up Dad Magic Movie App..."
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install main app dependencies
echo "📱 Installing main app dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Main app dependencies installed successfully"
else
    echo "❌ Failed to install main app dependencies"
    exit 1
fi

# Install server dependencies
echo "🖥️  Installing server dependencies..."
cd server
npm install

if [ $? -eq 0 ]; then
    echo "✅ Server dependencies installed successfully"
else
    echo "❌ Failed to install server dependencies"
    exit 1
fi

cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔑 Creating .env file..."
    cat > .env << EOF
# TMDB API Configuration
TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE

# Socket Server Configuration
SOCKET_SERVER_URL=http://localhost:3001

# App Configuration
NODE_ENV=development
EOF
    echo "✅ .env file created"
    echo "⚠️  Please update .env file with your TMDB API key"
else
    echo "✅ .env file already exists"
fi

# Create assets directory if it doesn't exist
if [ ! -d assets ]; then
    echo "📁 Creating assets directory..."
    mkdir -p assets
    echo "✅ Assets directory created"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Get your TMDB API key from https://www.themoviedb.org/"
echo "2. Update the .env file with your API key"
echo "3. Start the socket server: cd server && npm start"
echo "4. Start the customer app: npm start"
echo "5. Start the magician app: npx expo start --dev-client"
echo ""
echo "For more information, see README.md"
