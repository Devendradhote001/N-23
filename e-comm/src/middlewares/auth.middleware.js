const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const redisInstance = require("../services/redis");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "Token not found",
      });

    let isBlacklisted = await redisInstance.get(token);

    if (isBlacklisted)
      return res.status(404).json({
        message: "token blacklist kardiya mene ",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode)
      return res.status(403).json({
        message: "Invalid token",
      });

    let user = await userModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    console.log("error in authMidleware", error);
  }
};

module.exports = authMiddleware;
