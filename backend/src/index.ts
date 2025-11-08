import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './utils/database';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import donationRoutes from './routes/donations';
import farmerRoutes from './routes/farmers';
import nutritionRoutes from './routes/nutrition';
import supplyChainRoutes from './routes/supplyChain';
import wasteRoutes from './routes/waste';
import diseaseRoutes from './routes/disease';
import { protect } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/supply-chain', supplyChainRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/disease', diseaseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Usana API is running' });
});

// Test auth endpoint
app.get('/api/test-auth', protect, (req: any, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Auth working', 
    user: {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌❌❌ Global Error Handler:');
  console.error('Error:', err);
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('Request URL:', req.url);
  console.error('Request Method:', req.method);
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
});

export default app;