  // src/app.ts

  import 'reflect-metadata';          // Required for TypeORM
  import dotenv from 'dotenv';
  dotenv.config(); // MUST be first

  // TEMP: Debug environment variables
  console.log({
    SID: process.env.TWILIO_ACCOUNT_SID,
    FROM: process.env.TWILIO_WHATSAPP_FROM
  });

  import express from 'express';
  import cors from 'cors';
  import { AppDataSource } from './config/db'; // TypeORM DataSource

  // Import your routes
  import authRoutes from './routes/authRoutes';
  import floodRoutes from './routes/floodRoutes';
  import alertRoutes from './routes/alertRoutes';
  import whatsappRoutes from './routes/whatsappRoutes';
  import subscriberRoutes from './routes/subscriberRoutes';
  import { startFloodMonitoring } from './services/floodMonitorService';
  import healthRoutes from './routes/heathRoutes';
  import  { requestLogger } from './middlewares/requestLogger';


  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);


  // Root test route
  app.get('/', (req, res) => {
    res.send('GeoSafe AI Backend is running');
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/flood', floodRoutes);
  app.use('/api/alerts', alertRoutes);
  app.use('/api/whatsapp', whatsappRoutes);
  app.use('/api/subscribers', subscriberRoutes);
  app.use('/api/health', healthRoutes);




  // Initialize DB and start server
  AppDataSource.initialize()
    .then(() => {
      console.log('Database initialized');

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Database failed to initialize', err);
    });

      

  startFloodMonitoring();
