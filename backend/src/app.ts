// src/app.ts
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/db';

import authRoutes from './routes/authRoutes';
import floodRoutes from './routes/floodRoutes';
import alertRoutes from './routes/alertRoutes';
import whatsappRoutes from './routes/whatsappRoutes';
import subscriberRoutes from './routes/subscriberRoutes';
// import healthRoutes from './routes/healthRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

import { startFloodMonitoring } from './services/floodMonitorService';
import { requestLogger } from './middlewares/requestLogger';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Single CORS config
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

app.use(express.json());
app.use(requestLogger);

// Root test route
app.get('/', (_, res) => {
  res.send('GeoSafe AI Backend is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/flood', floodRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/subscribers', subscriberRoutes);
// app.use('/api/health', healthRoutes);
app.use('/api', dashboardRoutes);

// ✅ Initialize DB FIRST, then start services
AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized');

    // 🚀 Start flood monitoring AFTER DB ready
    startFloodMonitoring();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database failed to initialize', err);
  });
