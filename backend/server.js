import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import proRoutes from './routes/proRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Configuration
dotenv.config();
const app = express();

// Database Connection
connectDB();

// Middleware

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// 1. Root Route (Fixes the "Cannot GET /" error in browser)
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API. Server is live and healthy!",
    timestamp: new Date().toISOString()
  });
});

// 2. Mounting API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/analytics', analyticsRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/pros', proRoutes);

// 3. 404 Handler (For any routes not defined above)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found on this server.`
  });
});

// Port Configuration (Railway uses process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
