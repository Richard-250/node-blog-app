import passport from "passport";
import jwt from 'jsonwebtoken';
import User from "../database/models/user.mjs";
import { sendVerificationEmail } from '../services/sendEmail.service.mjs';

export const registerUser = async (req, res) => {
    console.log(req.body);
    try {
        console.log('Received request:', req.body);
        const user = await User.create(req.body);
        console.log('User created:', user);
        await sendVerificationEmail(user);
        
        res.status(201).json({
            message: 'Signup successfully',
            data: user
        }); 

    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
        console.log('user not saved')
    }
};


export const loginUser = async (req, res) => {
    res.send('hello world!')
};


