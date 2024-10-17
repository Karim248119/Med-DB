const express = require("express");
const controller = require("../../apis/service");
const router = express.Router();

const base = "/services";

// Get all
router.get(base, controller.getAllServices);

// Get by ID.
router.get(`${base}/:id`, controller.getOneService);

// Add
router.post(`${base}/add`, controller.uploadMiddleware, controller.addService);

// Update
router.put(
  `${base}/:id`,
  controller.uploadMiddleware,
  controller.updateService
);

// Delete
router.delete(`${base}/:id`, controller.deleteService);

module.exports = router;
