import { NextFunction, Request, Response } from 'express';
import { MongooseQueryOptions, UpdateQuery } from 'mongoose';

export interface IBaseController<T> {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    findOne(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteOne(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IBaseService<T> {
    create(payload: T): Promise<T>;
    findOne(id: string): Promise<T | null>;
    getAll(query: MongooseQueryOptions<T>): Promise<T[]>;
    update(id: string, payload: UpdateQuery<T> | undefined): Promise<T | null>;
    deleteOne(id: string): Promise<T | null>;
}

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}
