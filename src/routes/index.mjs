import { Router } from 'express';
import userRoutes from './api/user.routes.mjs'; // Use a meaningful name

const routes = Router();


routes.use(userRoutes); 

export default routes;
