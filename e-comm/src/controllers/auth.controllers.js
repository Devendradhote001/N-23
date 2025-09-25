const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisInstance = require("../services/redis");

const registerController = async (req, res) => {
  try {
    let { firstName, lastName, username, email, mobile, password } = req.body;

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    let hashedPass = await bcrypt.hash(password, 10);

    let newUser = await userModel.create({
      name: {
        firstName,
        lastName,
      },
      username,
      email,
      mobile,
      password: hashedPass,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    console.log("error in registration->", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    let comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass)
      return res.status(401).json({
        message: "Invalid Credentials",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "user logged in",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "Token not found",
      });

    await redisInstance.set(token, "blackListed");

    res.clearCookie("token");
    return res.status(200).json({
      message: "user logged out",
    });
  } catch (error) {
    console.log("error in logo", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
