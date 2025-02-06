import { Router } from 'express';
import '../../config/passport.config.mjs';
import { registerUser, loginUser, verifyEmail} from '../../controllers/user.controller.mjs';
import validateLogin from '../../validations/login.validation.mjs';
import validateSignup from '../../validations/singup.validation.mjs';
import verifyUser from '../../middlewares/verifyUser.mjs';
import verifyToken from '../../middlewares/verifyToken.mjs';
import passport from 'passport';
import { googleCallback } from '../../controllers/googleCallback.mjs';


const route = Router();

route.post('/signup', validateSignup, verifyUser, registerUser);
route.post('/login', validateLogin, loginUser); 
route.get('/verify-email/:token', verifyToken, verifyEmail);
route.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
// route.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);
route.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback);
  

export default route; 

 