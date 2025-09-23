const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGO_URI);
    if (res) {
      console.log("mongoDB connected");
    }
  } catch (error) {
    console.log("error in mongodb", error);
  }
};

module.exports = connectDB;
