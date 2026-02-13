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
// We allow the specific frontend URL or fall back to a wildcard for testing
const allowedOrigin = process.env.CLIENT_URL || 'https://myfe.up.railway.app';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parser
app.use(express.json());

// 4. Routes
// FIX: Use a relative path '/api/services', NOT a full URL
app.use('/api/services', serviceRoutes);

// Health check / Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'HOME Maintenance API is live' 
  });
});

// 5. Global Error Handler (Optional but recommended to prevent CORS blocks on crashes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// 6. Server Initialization
const PORT = process.env.PORT || 5000;

// On Railway, we must listen on '0.0.0.0'
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Accepting requests from: ${allowedOrigin}`);
});
