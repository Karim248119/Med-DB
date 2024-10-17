const doctorsModule = require("../models/doctor.js");

const controller = (req, res) => {
  res.status(200).render("index", {
    doctors: doctorsModule,
  });
};

module.exports = controller;
