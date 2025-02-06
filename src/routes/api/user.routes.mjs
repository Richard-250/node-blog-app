import { Router } from 'express';
import { registerUser, loginUser, verifyEmail } from '../../controllers/user.controller.mjs';
import validateLogin from '../../validations/login.validation.mjs';
import validateSignup from '../../validations/singup.validation.mjs';
import verifyUser from '../../middlewares/verifyUser.mjs';

const route = Router();

route.post('/signup', validateSignup, verifyUser, registerUser);
route.post('/login', loginUser); 
route.get('/verify-email/:token', verifyEmail);

export default route; 

