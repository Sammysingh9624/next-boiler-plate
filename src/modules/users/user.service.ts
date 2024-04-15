import { BaseService } from '../../base/base.service';
import UserModel, { UserInterface } from './user.modal';

export class UserService extends BaseService<UserInterface> {
    constructor() {
        super(UserModel);
    }

    create = async (payload: UserInterface) => {
        return this._model.create(payload);
    };
}
