const express = require("express");
const controller = require("../../apis/specialities");
const router = express.Router();

const base = "/specialities";

// Get all
router.get(base, controller.getAllSpecialities);

// Get by ID.
router.get(`${base}/:id`, controller.getOneSpeciality);

// Add
router.post(
  `${base}/add`,
  controller.uploadMiddleware,
  controller.addSpeciality
);

// Update
router.put(
  `${base}/:id`,
  controller.uploadMiddleware,
  controller.updateSpeciality
);

// Delete
router.delete(`${base}/:id`, controller.deleteSpeciality);

module.exports = router;
