const userModle = require("../models/user.js");
const genericMethod = require("../models/generic.js");

const userMetod = new genericMethod(userModle);

const indexController = async (req, res) => {
  const users = await spMethod.getAll();
  res.status(200).render("users/index", {
    users,
    currentPath: req.path,
  });
};
