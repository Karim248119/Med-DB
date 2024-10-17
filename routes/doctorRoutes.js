const controller = require("../controllers/doctors");
const router = require("./mvcRoutes");

const base = "/doctors";

router.get(base, controller.indexController);
router.get(`${base}/add`, controller.renderAdd);
router.get(`${base}/update/:id`, controller.renderUpdate);
router.post(`${base}/delete/:id`, controller.deleteDoctor);
router.post(`${base}/add`, controller.uploadMiddleware, controller.addDoctor);
router.post(
  `${base}/update/:id`,
  controller.uploadMiddleware,
  controller.updateDoctor
);

module.exports = router;
