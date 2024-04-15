import { Model, MongooseQueryOptions, UpdateQuery } from 'mongoose';
import { IBaseService } from './types';

export abstract class BaseService<T> implements IBaseService<T> {
    protected _model: Model<T>;
    constructor(model: Model<T>) {
        this._model = model;
    }

    create = async (payload: T) => {
        return this._model.create(payload);
    };
    findOne = async (id: string) => {
        return this._model.findById(id);
    };
    getAll = async (query: MongooseQueryOptions<T>): Promise<T[]> => {
        return this._model.find(query);
    };
    update = async (id: string, payload: UpdateQuery<T> | undefined) => {
        return this._model.findByIdAndUpdate(id, payload, { new: true });
    };
    deleteOne = async (id: string) => {
        return this._model.findByIdAndDelete(id);
    };
}
