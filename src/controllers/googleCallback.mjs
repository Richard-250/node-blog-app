import passport from "passport";
import jwt from "jsonwebtoken";

export const googleCallback = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

  console.log('Google Authentication successfuly')

  const message = req.authInfo?.message || "Login successful"; 
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}&message=${encodeURIComponent(message)}`);
  } catch (error) {
    console.error("Google Authentication Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
