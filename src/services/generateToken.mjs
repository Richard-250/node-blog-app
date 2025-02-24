import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  console.log("user to be token", user);
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  console.log("token", token);
  return token;
};

export default generateToken;
