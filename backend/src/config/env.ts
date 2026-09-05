import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/flowmetrics'),
  JWT_SECRET: z.string().default('flowmetrics-production-secure-jwt-secret-key-2026!'),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  ADMIN_NAME: z.string().default('Flowmetrics Admin'),
  ADMIN_EMAIL: z.string().email().default('admin@flowmetrics.io'),
  ADMIN_PASSWORD: z.string().min(8).default('AdminPassword123!'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

export const env = parsedEnv.data;
