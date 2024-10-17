const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: false },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const news = mongoose.model("news", NewsSchema);
module.exports = news;
