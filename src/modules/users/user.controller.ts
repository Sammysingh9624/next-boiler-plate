// user.controller.ts

import BaseController from '../../base/baseController';
import { UserInterface } from './user.modal';
import { UserService } from './user.service';

export class UserController extends BaseController<UserInterface> {
    constructor() {
        super(new UserService());
    }
}
