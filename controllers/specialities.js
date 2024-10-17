const { document } = require("postcss");
const specialitiesModel = require("../models/speciality");
const genericMethod = require("../models/generic.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const spMethod = new genericMethod(specialitiesModel);

const multerStoragte = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/specialities");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/");
    cb(null, `speciality-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({
  storage: multerStoragte,
});

const uploadMiddleware = uploader.single("img");

const indexController = async (req, res) => {
  const specialities = await spMethod.getAll();
  res.status(200).render("specialities/index", {
    specialities,
    currentPath: req.path,
  });
};

const renderAdd = async (req, res) => {
  res.status(200).render("specialities/add");
};
const addspeciality = async (req, res) => {
  const { title, img } = req.body;
  const specialityData = {
    title,
    img: `/images/specialities/${req.file.filename}`,
  };
  await spMethod.create(specialityData);
  console.log(specialityData);

  res.status(201).redirect("/specialities");
};

const deleteSpeciality = async (req, res) => {
  const id = req.params.id;
  await spMethod.delete(id);
  res.status(201).redirect("/specialities");
};

module.exports = {
  indexController,
  renderAdd,
  addspeciality,
  uploadMiddleware,
  deleteSpeciality,
};
