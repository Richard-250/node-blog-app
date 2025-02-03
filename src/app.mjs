import express from 'express';
import passport from 'passport';
import session from 'express-session';

import mongoose from 'mongoose';
import config from './database/config/database.config.mjs';


const app = express()

const env = process.env.NODE_ENV || 'development';
const mongoUri = config[env].url;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected to ${env} database`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};

connectDB()

export default app;