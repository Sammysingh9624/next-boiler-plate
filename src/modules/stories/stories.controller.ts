// user.controller.ts

import BaseController from '../../base/baseController';
import { StoriesInterface } from './stories.modal';
import { StoriesService } from './stories.service';

export class StoriesController extends BaseController<StoriesInterface> {
    protected service: StoriesService = new StoriesService();
    constructor() {
        super(new StoriesService());
    }
}
