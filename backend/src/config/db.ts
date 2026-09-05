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
    console.warn('⚠️ MongoDB not connected yet. API is running in resilient fallback mode.');
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.');
});
