require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db/db");
const productRoutes = require("./src/routes/product.routes");
const userRoutes = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");
const redisInstance = require("./src/services/redis");

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

redisInstance.on("connect", () => {
  console.log("Redis connected successfully");
});

redisInstance.on("error", (error) => {
  console.log("error in redis", error);
});

const saveRedisData = async () => {
  await redisInstance.set("users", "mujheee nhai pata", "EX", 60);
};

saveRedisData();

let PORT = process.env.PORT || 4500;

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
