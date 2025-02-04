import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-0auth20'
import User from "../database/models/user.mjs";
import dotenv from 'dotenv';

dotenv.config()

passport.use(new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Google Profile:", profile);
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                fullName: profile.displayName,
                isVerified: true,
                password: Math.random().toString(36).slice(-8)
            });
        }
        return done(null, user)
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser( async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
})