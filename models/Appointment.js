const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  message: { type: String, required: false },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  speciality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "speciality",
    required: true,
  },
});

const appointment = mongoose.model("appointmen", appointmentSchema);

module.exports = appointment;
