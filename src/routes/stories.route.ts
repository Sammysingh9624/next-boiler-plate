import express from 'express';
import { StoriesController } from '../modules/stories/stories.controller';

const router = express.Router();
const storiesController = new StoriesController();
router.route('/').post(storiesController.create).get(storiesController.getAll);
export default router;
