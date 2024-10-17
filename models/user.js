const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username must be less than 30 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid e-mail"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  role: { type: String, required: true, default: "user" },
  token: { type: String, required: false },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
