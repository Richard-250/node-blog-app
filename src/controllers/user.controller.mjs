import jwt from "jsonwebtoken";
import User from "../database/models/user.mjs";
import { sendVerificationEmail } from "../services/sendEmail.service.mjs";
import generateToken from "../services/generateToken.mjs";

export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    console.log("Received request:", req.body);
    const user = await User.create(req.body);
    console.log("User created:", user);
    await sendVerificationEmail(user);

    res.status(201).json({
      message: "Signup successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
    console.log("user not saved");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Email or password are not valid" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Your account is not verified" });
    }

    const isValidpassword = await user.comparePassword(password);
    if (!isValidpassword) {
      return res
        .status(401)
        .json({ message: "Email or Password are not valid" });
    };
    console.log("user", user);
    const userToken = await generateToken(user);
    res.status(200).json({
      message: "Login successful",
      userData: {
        user,
      },
      userToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Invalid or missing token" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfuly" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBlog = (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    if (user.role && user.role === "author") {
      res.status(201).json("blog created success full");
    }
    return res.status(403).json("only author can create blog!");
  } catch (error) {
    console.log("error", error);
  }
};
