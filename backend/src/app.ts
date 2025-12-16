import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import floodRoutes from './routes/floodRoutes';
import alertRoutes from './routes/alertRoutes';


dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/flood', floodRoutes);

app.use('/api/alerts', alertRoutes);


// Health check
app.get('/', (req, res) => {
    res.send('GeoSafe AI Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
