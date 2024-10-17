const controller = require("../controllers/specialities");
const router = require("./mvcRoutes");

const base = "/specialities";

router.get(base, controller.indexController);
router.get(`${base}/add`, controller.renderAdd);
router.post(
  `${base}/add`,
  controller.uploadMiddleware,
  controller.addspeciality
);
router.post(`${base}/delete/:id`, controller.deleteSpeciality);

module.exports = router;
