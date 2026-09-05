import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { connectDB } from './config/db';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { apiLimiter } from './middleware/rateLimiter';

const app = express();

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS Configuration
const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || env.NODE_ENV === 'development' || env.CLIENT_URL === '*') {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in cloud deployments for preview origins
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Request Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// Health Check Endpoints (Handles all common health check routes)
app.get(['/health', '/api/health', '/api/v1/health'], (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Flowmetrics API',
  });
});

// Root Welcome Endpoint
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'Flowmetrics API Server',
    version: '1.0.0',
    status: 'healthy',
    frontend: env.CLIENT_URL,
    endpoints: {
      health: '/api/v1/health',
      plans: '/api/v1/plans',
      blog: '/api/v1/blog',
      auth: '/api/v1/auth/login',
    },
  });
});

// Global API Rate Limiter
app.use('/api', apiLimiter);

// API Routes (Mounted at both /api/v1 and /api for full compatibility)
app.use('/api/v1', routes);
app.use('/api', routes);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

// Start Server after connecting to MongoDB
const startServer = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`
🚀 Flowmetrics API Server is running!
📡 Environment : ${env.NODE_ENV}
🌐 Listening on: http://localhost:${env.PORT}
🔗 Client URL  : ${env.CLIENT_URL}
    `);
  });

  const handleShutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
    server.close(() => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer();

export default app;
