import { BaseService } from '../../base/base.service';
import ServiceModel, { ServiceInterface } from './services.modal';

export class ServicesService extends BaseService<ServiceInterface> {
    constructor() {
        super(ServiceModel);
    }

    async getBySlug(slug: string) {
        return this._model.findOne({ 'header.slug': slug });
    }
}
