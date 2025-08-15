#!/bin/bash

echo "🎬 Starting Dad Magic Movie App..."
echo "=================================="

# Check if socket server is running
if ! curl -s http://localhost:3001/health > /dev/null; then
    echo "🖥️  Starting socket server..."
    cd server
    npm start &
    cd ..
    sleep 3
else
    echo "✅ Socket server is already running"
fi

echo ""
echo "🌐 Starting Customer App (Expo Web)..."
echo "This will open in your browser automatically"
echo ""

# Start customer app
npx expo start --web

echo ""
echo "📱 To run the Magician App:"
echo "1. Open a new terminal"
echo "2. Navigate to this directory"
echo "3. Run: npx expo start --dev-client"
echo "4. Select MagicianApp.js as the entry point"
echo ""
echo "🔗 URLs:"
echo "Customer App: http://localhost:8081"
echo "Magician App: Will be shown in the new terminal"
echo ""
echo "🎪 Both apps will communicate in real-time!"
