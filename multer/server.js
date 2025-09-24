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
