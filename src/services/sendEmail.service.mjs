import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (user) => {
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`

    await transporter.sendMail({
        to: user.email,
        subject: 'Verify Your Email',
        html: `
         <h1>Email Verification</h1>
      <p>Please click the button below to verify your email:</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <br> <br>Remember, beware of scams and keep this one-time verification link confidential.<br>
    </strong><br> DESTRUCTORS </div>
      `
    });
};