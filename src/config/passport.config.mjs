import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../database/models/user.mjs";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);

        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log("User already exists:", user.email);
          return done(null, user, { message: "You already have an account. Please log in." });
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName,
          role:  "blogger",
          isVerified: true,
          telephone: "", // Empty because Google doesn't provide it
          password: Math.random().toString(36).slice(-8), // Random temporary password
        });

        console.log("New user created:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("Google Authentication Error:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
