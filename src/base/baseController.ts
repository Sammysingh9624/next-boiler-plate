import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/catchAsyncError';
import { BaseService } from './base.service';
import { IBaseController } from './types';

abstract class BaseController<T> implements IBaseController<T> {
    protected service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await this.service.create(req.body);
        res.status(201).json(doc);
    });

    findOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log('req.params.id', req.params.id);

        const doc = await this.service.findOne(req.params.id);
        console.log('req.params.id', doc);
        if (!doc) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }
        res.status(200).json(doc);
    });

    getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const docs = await this.service.getAll(req.query);
        res.status(200).json({ data: docs, count: docs.length });
    });

    update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await this.service.update(req.params.id, req.body);
        if (!doc) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }
        res.status(200).json(doc);
    });

    deleteOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await this.service.deleteOne(req.params.id);
        if (!doc) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    });
}

export default BaseController;
