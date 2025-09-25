const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("image"), (req, res) => {
  let path = req.files?.map((elem) => `${elem.filename}`);
  console.log(path);

  res.send(path);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// Authentication steps---

// 1. Connect Db
// 2. userModel
// 3. routes - register
// 4. controller  - regController
// - existing user
// - hashPass
// - user save in db
// - token genration - expiresIn
// - save in cookies
// - response bhejoooo

// 5. routes - login
// - find user via email, username, mobile
// - compare passs
// - generate token - expires time
// - Saves in cookie
// - response bhejooo

// 6. routes - logout
// - delete token from cookies
// - response bhejooo

// 7. Home screen check if user not loggedin

