const express = require("express");
const controller = require("../../apis/user");
const router = express.Router();

const base = "/users";

//getAll
router.get(base, controller.getAllUsers);

//add (Register)
router.post(`${base}/add`, controller.addUser);

//update
router.put(`${base}/:id`, controller.updateUser);

//delete
router.delete(`${base}/:id`, controller.deleteUser);

//login
router.post(`${base}/login`, controller.login);

module.exports = router;
