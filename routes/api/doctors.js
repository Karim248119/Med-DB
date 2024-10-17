const express = require("express");
const controller = require("../../apis/doctors");
const router = express.Router();

const base = "/doctors";

// Get all doctors
router.get(base, controller.getAllDoctors);

// Get doctor by ID.
router.get(`${base}/:id`, controller.getDoctorById);

// Add
router.post(`${base}/add`, controller.uploadMiddleware, controller.addDoctor);

// Update
router.put(`${base}/:id`, controller.uploadMiddleware, controller.updateDoctor);

// Delete
router.delete(`${base}/:id`, controller.deleteDoctor);

module.exports = router;
