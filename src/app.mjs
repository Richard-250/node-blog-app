import express from "express";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import config from "./database/config/database.config.mjs";
import allRouter from "./routes/index.mjs";
import "./database/seeders/userSeeder.mjs";
import "./config/passport.config.mjs";
import seedUsers from "./database/seeders/userSeeder.mjs";
const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(allRouter);

const env = process.env.NODE_ENV || "development";
const mongoUri = config[env].url;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    seedUsers();
    console.log(`MongoDB connected to ${env} database`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

export default app;
