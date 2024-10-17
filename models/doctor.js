const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "speciality",
    required: true,
  },
  img: { type: String, required: false },
  resume: { type: String, required: true },
  contacts: {
    phone: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },
});

const doctor = mongoose.model("doctor", doctorSchema);

module.exports = doctor;
