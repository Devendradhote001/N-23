const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/home", authMiddleware, (req, res) => {
  res.send("i m home");
});

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
