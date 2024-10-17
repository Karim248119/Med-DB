const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  img: { type: String, required: true },
  videoSrc: { type: String },
  icon: { type: String },
});
const service = mongoose.model("service", serviceSchema);

module.exports = service;
