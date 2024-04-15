import express from 'express';
import { UserController } from '../modules/users/user.controller';
import userValidator from '../validationSchema/user.schema';

const router = express.Router();
const userController = new UserController();
router.route('/:id').get(userController.findOne).put(userController.update).delete(userController.deleteOne);
router.route('/').post(userValidator, userController.create).get(userController.getAll);
export default router;
