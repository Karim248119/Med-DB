const specialityModel = require("../models/speciality");
const genericMethod = require("../models/generic.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const spMethod = new genericMethod(specialityModel);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/specialities");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `speciality-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({ storage: multerStorage });

const uploadMiddleware = uploader.single("img");

// Get all
const getAllSpecialities = async (req, res) => {
  try {
    const { page = 1, limit = 100, title } = req.query;
    let filters = {};
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
    const specialities = await spMethod.getAll(
      filters,
      {},
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      specialities,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching specialities" });
  }
};

// Get one by ID
const getOneSpeciality = async (req, res) => {
  try {
    const id = req.params.id;
    const speciality = await spMethod.getById(id);
    if (!speciality) {
      return res.status(404).json({ message: "Speciality not found" });
    }
    res.status(200).json({ success: true, speciality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching speciality" });
  }
};
//add
const addSpeciality = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const specialityData = {
      title,
      description,
      img: `/images/specialities/${req.file.filename}`,
    };

    const newSpeciality = await spMethod.create(specialityData);
    res
      .status(201)
      .json({ message: "Speciality added successfully", newSpeciality });
  } catch (error) {
    console.error("Error adding speciality:", error);
    res.status(500).json({ message: "Error adding speciality" });
  }
};

// Update
const updateSpeciality = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.img = `/images/specialities/${req.file.filename}`;
    }

    const speciality = await spMethod.update(id, updatedData);
    if (!speciality) {
      return res.status(404).json({ message: "Speciality not found" });
    }
    res.status(200).json({ success: true, speciality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating speciality" });
  }
};

// Delete
const deleteSpeciality = async (req, res) => {
  try {
    const id = req.params.id;
    const speciality = await spMethod.delete(id);
    if (!speciality) {
      return res.status(404).json({ message: "Speciality not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Speciality deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting speciality" });
  }
};

module.exports = {
  getAllSpecialities,
  getOneSpeciality,
  addSpeciality,
  updateSpeciality,
  deleteSpeciality,
  uploadMiddleware,
};
