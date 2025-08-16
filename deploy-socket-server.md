# 🚀 Deploy Socket Server to Cloud

## **Why This Fixes Your Connection Issue:**

Your Netlify sites are hosted on the internet, but trying to connect to your local socket server at `192.168.1.99:3001`. This won't work because:
- Netlify sites are on the internet
- Your socket server is only on your local network
- They can't communicate across this boundary

## **Solution: Deploy Socket Server to Cloud**

### **Option 1: Heroku (Free)**
1. **Create Heroku account**: [heroku.com](https://heroku.com)
2. **Install Heroku CLI**: `brew install heroku` (Mac)
3. **Deploy**:
   ```bash
   cd server
   heroku create dad-magic-socket
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a dad-magic-socket
   git push heroku main
   ```

### **Option 2: Railway (Free)**
1. **Go to**: [railway.app](https://railway.app)
2. **Connect GitHub** and select your repo
3. **Deploy** the `server` folder

### **Option 3: Render (Free)**
1. **Go to**: [render.com](https://render.com)
2. **Create Web Service** from your GitHub repo
3. **Set root directory** to `server`

## **After Deployment:**

1. **Update both sites** with the new socket server URL
2. **Test connection** between customer and magician views
3. **Both sites will connect** from anywhere in the world!

## **Quick Test - Use Local Network:**

While deploying, test with local network:
- **Customer**: `http://192.168.1.99:3000/customer-netlify.html`
- **Magician**: `http://192.168.1.99:3000/magician-netlify.html`

This will work immediately since both are on the same network as your socket server.
