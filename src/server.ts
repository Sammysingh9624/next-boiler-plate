import dotenv from 'dotenv';
import fs from 'fs';
import app from './app';
import { databaseConnection } from './config/config';
dotenv.config();

// checking if .env file is available
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('.env file not found.');
}

export const PORT = (process.env.PORT || 5000) as number;

databaseConnection();

//server connection
const server = app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});

//uncaughtException from server
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    process.exit(1);
});

//unhandledRejection from server
process.on('unhandledRejection', (err: Error) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
