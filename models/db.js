const DB_URL = require("./config.js");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "med",
    });
    console.log("conncted to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
