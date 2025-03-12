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
    res.status(500).json({ status: false, message: "something went wrong" , error: err.message });
    console.log("user not saved");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const foundUser = await User.findOne({ email});
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("foundUser:", foundUser)

    if (!user) {
      return res
        .status(401)
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
    res.status(201).json({
      message: "Login successfull",
      userData: {
        user,
      },
      userToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "something went wrong" });
  };
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Invalid or missing token" });
    };

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    };

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfuly" });
  } catch (err) {
    res.status(500).json({ error: err.message, message: 'something went wrong' });
  };
};

export const addBlog = (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    if (user.role && user.role === "author") {
      res.status(201).json("blog created successfully");
    }
    return res.status(403).json("only author can create blog!");
  } catch (error) {
    console.error("error", error);
  }
};
