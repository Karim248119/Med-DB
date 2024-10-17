const userModel = require("../models/user.js");
const genericMethod = require("../models/generic.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userMethods = new genericMethod(userModel);

require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//getAll

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 100, name } = req.query;
    let filters = {};
    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }
    const users = await userMethods.getAll(
      filters,
      {},
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//add (Register)
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const oldUser = await userModel.findOne({ email: email });
    if (oldUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await userMethods.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
    });

    //JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET_KEY
    );
    newUser.token = token;
    await newUser.save();

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//update
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await userMethods.update(id, data);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//delete
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userMethods.delete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email & password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (user && matchPassword) {
      //JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET_KEY
      );

      return res.json({
        success: true,
        user: user,
        data: { token },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  login,
  userMethods,
  JWT_SECRET_KEY,
};
