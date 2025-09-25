const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/home", authMiddleware, (req, res) => {
  return res.send("okk me in hu");
});

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;
