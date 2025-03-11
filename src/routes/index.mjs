import { Router } from 'express';
import userRoutes from './api/user.routes.mjs'; 
import welcome from './welcomeRoute.mjs';

const routes = Router();


routes.use('/users', userRoutes); 
routes.use('/', welcome);

export default routes;
