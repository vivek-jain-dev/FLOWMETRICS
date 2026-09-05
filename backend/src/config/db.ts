import mongoose from 'mongoose';
import { env } from './env';

// Disable buffering so queries fail immediately when DB is disconnected instead of hanging for 10s
mongoose.set('bufferCommands', false);

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('⚠️ MongoDB not available locally, API will serve default fallback content smoothly.');
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.');
});
