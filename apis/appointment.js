const appointmentModel = require("../models/Appointment.js");
const genericMethod = require("../models/generic.js");
const appointmentMethod = new genericMethod(appointmentModel);

// get all
const getAllAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, speciality, doctor, user } = req.query;
    const filters = {};

    if (speciality) filters.speciality = speciality;
    if (doctor) filters.doctor = doctor;
    if (user) filters.user = user;

    const appointments = await appointmentMethod.getAll(
      filters,
      [
        { ref: "doctor", fields: ["name"] },
        { ref: "speciality", fields: ["title"] },
        { ref: "user", fields: ["name"] },
      ],
      limit
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// get one by id
const getOneAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await appointmentMethod.getById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment" });
  }
};

// add
const createAppointment = async (req, res) => {
  try {
    const data = req.body;
    const newAppointment = await appointmentMethod.create(data);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment" });
  }
};

// update
const updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedAppointment = await appointmentMethod.update(id, data);
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment" });
  }
};

// delete
const deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAppointment = await appointmentMethod.delete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};

const mongoose = require("mongoose");

const getAppointmentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // 🔍 Debugging: Log the userId to check what is received
    console.log("Received userId:", userId);

    // ✅ Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // ✅ Convert userId to ObjectId for querying
    const appointments = await appointmentMethod.getAll(
      { user: new mongoose.Types.ObjectId(userId) },
      [
        { ref: "doctor", fields: ["name"] },
        { ref: "speciality", fields: ["title"] },
        { ref: "user", fields: ["name"] },
      ]
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Error fetching user appointments" });
  }
};

module.exports = {
  getAllAppointments,
  getOneAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentByUserId,
};
