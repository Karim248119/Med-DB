const doctorsModel = require("../models/Doctor");
const specialityModel = require("../models/speciality");
const genericMethod = require("../models/generic.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const docMethod = new genericMethod(doctorsModel);
const spMethod = new genericMethod(specialityModel);

const multerStoragte = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/doctors");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/");
    cb(null, `doctor-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({
  storage: multerStoragte,
});

const uploadMiddleware = uploader.single("img");

const indexController = async (req, res) => {
  const doctors = await docMethod.getAll(
    {},
    { ref: "sp_id", fields: ["title"] }
  );
  res.status(200).render("doctors", {
    doctors,
    currentPath: req.path,
  });
};

const renderAdd = async (req, res) => {
  const specialities = await spMethod.getAll();
  res.status(200).render("doctors/add", { specialities });
};

const renderUpdate = async (req, res) => {
  const doctor = await docMethod.getById(req.params.id);
  const specialities = await spMethod.getAll();
  res.status(200).render("doctors/update", {
    doctor,
    specialities,
  });
};

const addDoctor = async (req, res) => {
  const {
    name,
    img,
    sp_id,
    "contacts.phone": phone,
    "contacts.facebook": facebook,
    "contacts.linkedin": linkedin,
    "contacts.instagram": instagram,
    resume,
  } = req.body;

  //contacts data
  const contacts = {
    phone,
    facebook,
    linkedin,
    instagram,
  };

  const doctorData = {
    name,
    img: `/images/doctors/${req.file.filename}`,
    sp_id,
    contacts,
    resume,
  };
  await docMethod.create(doctorData);
  console.log(doctorData);

  res.status(201).redirect("/doctors");
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    sp_id,
    "contacts.phone": phone,
    "contacts.facebook": facebook,
    "contacts.linkedin": linkedin,
    "contacts.instagram": instagram,
    resume,
  } = req.body;

  const updateData = {
    name,
    sp_id,
    contacts: {
      phone,
      facebook,
      linkedin,
      instagram,
    },
    resume,
  };

  //image
  if (req.file) {
    updateData.img = `/images/doctors/${req.file.filename}`;
  }

  try {
    await docMethod.update(id, updateData);
    console.log("Doctor updated:", updateData);
    res.status(200).redirect("/doctors");
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).send("An error occurred while updating the doctor.");
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await docMethod.delete(id);
    console.log("Doctor deleted:", id);

    res.status(200).redirect("/doctors");
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).send("Failed to delete doctor.");
  }
};

module.exports = {
  indexController,
  renderAdd,
  addDoctor,
  uploadMiddleware,
  renderUpdate,
  updateDoctor,
  deleteDoctor,
};
