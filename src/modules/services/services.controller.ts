// user.controller.ts

import BaseController from '../../base/baseController';
import { ServiceInterface } from './services.modal';
import { ServicesService } from './services.service';

export class ServicesController extends BaseController<ServiceInterface> {
    protected service: ServicesService = new ServicesService();
    constructor() {
        super(new ServicesService());
    }
    getBySlug(slug: string) {
        return this.service.getBySlug(slug);
    }
}
