const express = require("express");
const controller = require("../../apis/appointment");
const router = express.Router();

const base = "/appointment";

// Get all
router.get(base, controller.getAllAppointments);

// Get doctor by ID.
router.get(`${base}/:id`, controller.getOneAppointment);

// Add
router.post(`${base}/add`, controller.createAppointment);

// Update
router.put(`${base}/:id`, controller.updateAppointment);

// Delete
router.delete(`${base}/:id`, controller.deleteAppointment);

module.exports = router;
