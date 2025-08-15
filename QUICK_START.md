# 🚀 Quick Start Guide - View Both Apps Live!

## 🎯 **What You'll Get:**
- **Customer App**: Browse movie genres and select movies
- **Magician App**: See customer selections in real-time
- **Real-time Sync**: Both apps communicate instantly

## 📱 **Step-by-Step Setup:**

### **1. Start the Socket Server (Terminal 1)**
```bash
cd server
npm start
```
✅ **Server will run on:** `http://localhost:3001`

### **2. Start the Customer App (Terminal 2)**
```bash
# In a new terminal window
npx expo start --web --port 8081
```
✅ **Customer App URL:** `http://localhost:8081`

### **3. Start the Magician App (Terminal 3)**
```bash
# In another new terminal window
npx expo start --dev-client --port 8082
```
✅ **Magician App URL:** `http://localhost:8082`

## 🌐 **Your Live URLs:**

| App | URL | Purpose |
|-----|-----|---------|
| **Customer App** | `http://localhost:8081` | Browse movies, select genres |
| **Magician App** | `http://localhost:8082` | See customer selections live |
| **Socket Server** | `http://localhost:3001` | Real-time communication |

## 🎬 **How to Test:**

1. **Open Customer App** in one browser tab: `http://localhost:8081`
2. **Open Magician App** in another browser tab: `http://localhost:8082`
3. **In Customer App**: Select a genre → Tap a movie poster
4. **In Magician App**: Watch the selected movie appear instantly!

## 🔧 **If Something's Not Working:**

### **Check Server Status:**
```bash
curl http://localhost:3001/health
```
Should return: `{"status":"OK"}`

### **Check Expo Status:**
```bash
lsof -i :8081  # Customer app
lsof -i :8082  # Magician app
```

### **Restart Everything:**
```bash
# Kill all processes
pkill -f "expo\|node.*socket"

# Start fresh
./run-apps.sh
```

## 🎪 **Magic Show Setup:**

1. **Customer App**: Give to your audience on tablets/phones
2. **Magician App**: Run on your main display/screen
3. **Real-time Magic**: Customer selections appear instantly on your screen!

## 📱 **Mobile Testing:**

- **iOS**: Use Expo Go app, scan QR code
- **Android**: Use Expo Go app, scan QR code
- **Web**: Use the localhost URLs above

## 🚨 **Important Notes:**

- **TMDB API Key**: You'll need to add your API key to `src/services/tmdbService.js`
- **Ports**: Make sure ports 8081, 8082, and 3001 are available
- **Firewall**: Allow local connections on these ports

---

**🎉 You're all set! Both apps will communicate in real-time!**
