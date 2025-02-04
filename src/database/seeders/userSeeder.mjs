import mongoose from "mongoose";
import User from "../models/user.mjs";
import dotenv from 'dotenv';

 dotenv.config();


 
const users = [
    {
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      telephone: '1234567890',
      isVerified: true
    }
  ];

  const seedUsers = async () => {
    try {
      await mongoose.connect(process.env.DEV_DATABASE_URL);
      await User.deleteMany({});
      await User.create(users);
      console.log('Users seeded successfully');
      process.exit();
    } catch (error) {
      console.error('Error seeding users:', error);
      process.exit(1);
    }
  };
  
  seedUsers();

  export default seedUsers