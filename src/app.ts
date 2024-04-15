import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import route from './routes/index';
import AppError from './utils/appError';
import errorHandler from './utils/globalErrorHandler';

declare global {
    namespace Express {
        interface Request {
            requestTime?: string;
        }
    }
}

const app = express();

//middleware to convert req in to json
app.use(express.json());
app.use(cors());

//sanitization against Nosql injection
app.use(mongoSanitize());

// Custom middleware to add request time to the request object
app.use((req: Request, res: Response, next: NextFunction) => {
    req.requestTime = new Date().toISOString();
    next();
});

// all api call
// app.use('/user', userRoute);
app.use('/', route);

//if path does not match
app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;
