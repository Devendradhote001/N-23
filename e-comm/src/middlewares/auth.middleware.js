const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "Token not found",
      });

    let decode = jwt.verify(token, process.env.JWT_SECERT);

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
