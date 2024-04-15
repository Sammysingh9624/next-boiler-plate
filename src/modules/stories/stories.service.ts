import { BaseService } from '../../base/base.service';
import StoriesModel, { StoriesInterface } from './stories.modal';

export class StoriesService extends BaseService<StoriesInterface> {
    constructor() {
        super(StoriesModel);
    }
}
