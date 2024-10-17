const express = require("express");
const controller = require("../../apis/news");
const router = express.Router();

const base = "/news";

// Get all
router.get(base, controller.getAllNews);

// Add
router.post(`${base}/add`, controller.uploadMiddleware, controller.addNews);

// Update
// router.put(
//   `${base}/:id`,
//   controller.uploadMiddleware,
//   controller.updateService
// );

// Delete
router.delete(`${base}/:id`, controller.deleteNews);

module.exports = router;
