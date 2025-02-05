import { Router } from 'express';
import { registerUser, loginUser } from '../../controllers/user.controller.mjs';
import validateLogin from '../../validations/login.validation.mjs';
import validateSignup from '../../validations/singup.validation.mjs';
import verifyUser from '../../middlewares/verifyUser.mjs';

const route = Router();

route.post('/signup', registerUser);
route.get('/login', loginUser); 

export default route;
