require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/user.routes");
const connectDB = require("./src/config/db/db");

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

let PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
