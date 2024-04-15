import express from 'express';
import { ServicesController } from '../modules/services/services.controller';

const router = express.Router();
const serviceController = new ServicesController();
router.route('/:slug').get(serviceController.getBySlug);
router.route('/').post(serviceController.create).get(serviceController.getAll);
export default router;
