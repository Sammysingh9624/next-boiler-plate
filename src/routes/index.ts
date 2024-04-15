import express from 'express';
import servicesRoute from './services.route';
import serviceRoute from './stories.route';
import userRoute from './user.route';

const route = express.Router();
route.use('/user', userRoute);
route.use('/services', servicesRoute);
route.use('/stories', serviceRoute);
export default route;
