const mongoose = require('mongoose');
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });

export const connectToDB = async () => {
  const dbConnection: string | undefined = process.env.MONGODB_URI;
  
  if (!dbConnection) {
    throw new Error('DB connection string not found. Please set MONGODB_URI in environment variables.');
  }

  try {
    await mongoose.connect(dbConnection);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(`DB Connection Error: ${err.message}`);
  }
};
