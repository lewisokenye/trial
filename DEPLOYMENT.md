# Usana Platform - Deployment Guide

Complete guide for deploying the Usana food security platform.

## Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- npm or yarn

## Backend Deployment

### 1. Environment Setup

Create `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Build and Run

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

Backend will run on `http://localhost:5000`

## Frontend Deployment

### 1. Environment Setup

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update with your production API URL.

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Build and Run

For development:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

For production build:
```bash
npm run build
```

This creates optimized files in the `dist/` directory.

Preview production build:
```bash
npm run preview
```

## Production Deployment

### Backend (Node.js)

**Option 1: Deploy to Heroku**
1. Create Heroku app
2. Add MongoDB addon or use MongoDB Atlas
3. Set environment variables
4. Deploy: `git push heroku main`

**Option 2: Deploy to Railway/Render**
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Frontend (Vite)

**Option 1: Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option 2: Deploy to Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

**Option 3: Deploy to GitHub Pages**
1. Update `vite.config.ts` with base path
2. Build: `npm run build`
3. Deploy dist folder to gh-pages branch

### Environment Variables for Production

**Backend:**
- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong secret key (use crypto.randomBytes(32).toString('hex'))
- `CLIENT_URL` - Production frontend URL
- `PORT` - Server port (usually provided by hosting)

**Frontend:**
- `VITE_API_URL` - Production backend API URL

## Database Setup

### MongoDB Atlas (Recommended)

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

### Local MongoDB

1. Install MongoDB
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/usana`

## Running Full Stack Locally

1. Start MongoDB (if using local)
2. Start backend:
   ```bash
   cd backend
   npm run dev
   ```
3. Start frontend (new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
4. Open browser: `http://localhost:5173`

## Testing the Application

1. Register a new account at `/register`
2. Login at `/login`
3. Explore the dashboard
4. Test creating donations, farmers, and waste entries

## Common Issues

**CORS Errors:**
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `backend/src/index.ts`

**API Connection Failed:**
- Verify backend is running
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend port matches

**MongoDB Connection Failed:**
- Verify MongoDB is running (local) or connection string (cloud)
- Check network access settings in MongoDB Atlas
- Verify database user credentials

## Security Checklist for Production

- [ ] Change JWT_SECRET to strong random value
- [ ] Update CORS origin to production frontend URL only
- [ ] Enable MongoDB authentication
- [ ] Use environment variables (never commit secrets)
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookie flags
- [ ] Implement rate limiting (already configured)
- [ ] Regular dependency updates
- [ ] Database backups configured

## Monitoring

Consider adding:
- Error tracking (Sentry)
- Performance monitoring (New Relic, Datadog)
- Uptime monitoring (UptimeRobot)
- Log aggregation (LogDNA, Papertrail)

## Support

For issues or questions, check:
- Backend API docs
- Frontend README
- MongoDB documentation
- Deployment platform documentation
