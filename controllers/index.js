const doctorsModule = require("../models/Doctor");

const controller = (req, res) => {
  res.status(200).render("index", {
    doctors: doctorsModule,
  });
};

module.exports = controller;
