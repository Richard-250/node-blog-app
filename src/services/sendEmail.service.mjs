import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (user) => {
  try {
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`

    await transporter.sendMail({
      from: `"iBlog Team" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Verify Your Email',
        html: `
         <h1>Email Verification</h1>
      <p>Please click the button below to verify your email:</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <br> <br>Remember, beware of scams and keep this one-time verification link confidential.<br>
    </strong><br> iBlog Team</div>
      `
    });

    console.log(`Verification email sent to ${user.email}`);
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email");
}
};