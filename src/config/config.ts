import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';
const DB = prod
    ? process.env.MONGO_LOCAL?.replace('<PASSWORD>', process.env.LOCAL_PASSWORD as string)
    : process.env.MONGO_PROD?.replace('<PASSWORD>', process.env.PROD_PASSWORD as string);

export const databaseConnection = async () => {
    try {
        // Connect to the database
        await mongoose.connect(DB as string);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};
