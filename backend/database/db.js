import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const url = process.env.MONGO_URI;
console.log('MONGODB_URI:', url); // Debugging line to verify the variable

if (!url) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};

export default connectToDatabase;
