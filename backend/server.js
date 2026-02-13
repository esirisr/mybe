import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import serviceRoutes from './routes/services.js';

dotenv.config();
connectDB();

const app = express();

// UPDATED CORS: Ensure no trailing slash on the URL
const allowedOrigin = process.env.CLIENT_URL || 'https://myfe.up.railway.app';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// UPDATED ROUTE: Use the relative path
app.use('/', serviceRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HOME Maintenance API is live' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
