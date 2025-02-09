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
      const isAdminCreated = await User.findOne({ email: users[0].email }) 
      if ( isAdminCreated) return 
      await User.create(users);
      console.log('Users seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error);
      await mongoose.disconnect(); 
    }
  };

  export default seedUsers