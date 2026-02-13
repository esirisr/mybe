import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import serviceRoutes from './routes/services.js';

// 1. Initialize environment variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middlewares
// Replace 'https://your-frontend.vercel.app' with your actual frontend URL later
app.use(cors({
  origin: process.env.CLIENT_URL || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// 4. Routes
app.use('https://mybe.up.railway.app/api/services', serviceRoutes);

// Health check / Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'HOME Maintenance API is live' });
});

// 5. Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
