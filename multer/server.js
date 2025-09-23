const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + Math.random());
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("ok");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
