const serviceModel = require("../models/service");
const genericMethod = require("../models/generic.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const spMethod = new genericMethod(serviceModel);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/services");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `service-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({ storage: multerStorage });

const uploadMiddleware = uploader.fields([
  { name: "img", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);

// Get all
const getAllServices = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const services = await spMethod.getAll(
      {},
      {},
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json({
      success: true,
      services,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching services" });
  }
};

// Get by ID
const getOneService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await spMethod.getById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching service" });
  }
};
//add
const addService = async (req, res) => {
  try {
    const { title, description, videoSrc } = req.body;

    if (!req.files || !req.files.img || !req.files.icon) {
      return res.status(400).json({ message: "Image or icon upload failed" });
    }

    const serviceData = {
      title,
      description,
      videoSrc,
      img: `/images/services/${req.files.img[0].filename}`,
      icon: `/images/services/${req.files.icon[0].filename}`,
    };
    const newService = await spMethod.create(serviceData);
    res.status(201).json({ message: "Service added successfully", newService });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Error adding service" });
  }
};

// Update
const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body };
    if (req.files) {
      if (req.files.img) {
        updatedData.img = `/images/services/${req.files.img[0].filename}`;
      }
      if (req.files.icon) {
        updatedData.icon = `/images/services/${req.files.icon[0].filename}`;
      }
    }

    const service = await spMethod.update(id, updatedData);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating service" });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await spMethod.delete(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting service" });
  }
};

module.exports = {
  getAllServices,
  getOneService,
  addService,
  updateService,
  deleteService,
  uploadMiddleware,
};
