const express = require("express");
const createProductController = require("../controllers/product.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create-product", authMiddleware, createProductController);

module.exports = router;
