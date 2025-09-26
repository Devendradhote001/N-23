require("dotenv").config();
const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");
const path = require("path");
const { sendFiles } = require("./src/services/imagekit");

app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

const storage = multer.memoryStorage();

const upload = multer({ storage });

app.post("/upload", upload.array("image"), async (req, res) => {
  try {
    let path = req.files?.map((elem) => `${elem.filename}`);
    console.log(req.files);

    let response = await Promise.all(
      req.files.map(
        async (elem) =>
          await sendFiles({ file: elem.buffer, fileName: elem.originalname })
      )
    );

    console.log("image uploaded response ->", response);

    let imagekitURL = response?.map((elem) => elem.url);
    console.log(imagekitURL);
    res.send(imagekitURL);
  } catch (error) {
    console.log("error", error);
  }
});

let PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
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
