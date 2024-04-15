import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

interface CustomError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
}

interface ValidationError extends CustomError {
    errors: { [key: string]: { message: string } };
}

const handleCastError = (err: CustomError & { path: string; value: any }): AppError => {
    const message = `Invalid ${err.path} ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateError = (err: { errmsg: string }): AppError => {
    const value = err.errmsg.match(/([""])(\\?.)*?\1/)?.[0];
    const message = `Duplicate field value: ${value}. Please use another name`;
    return new AppError(message, 400);
};

const handleValidationError = (err: ValidationError): AppError => {
    const value = Object.values(err.errors).map((el) => el.message);
    const message = `${value.join('. ')}`;
    return new AppError(message, 400);
};

const errForDev = (err: AppError, res: Response): void => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const errForProd = (err: AppError, res: Response): void => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went Wrong',
        });
    }
};

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        errForDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error: AppError = { ...err } as AppError;
        if (err.name === 'CastError') {
            error = handleCastError(err as CustomError & { path: string; value: any });
        }
        if (err.name === 'MongoError' && (err as any).code === 11000) {
            error = handleDuplicateError(err as any);
        }
        if (err.name === 'ValidationError') {
            error = handleValidationError(err as ValidationError);
        }
        errForProd(error, res);
    }
};

export default errorHandler;
