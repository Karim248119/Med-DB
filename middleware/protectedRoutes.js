const JWT = require("jsonwebtoken");
const genericMethods = require("../models/generic.js");
const userModel = require("../models/user.js");
const { JWT_SECRET_KEY } = require("../apis/user.js");

const userMethods = new genericMethods(userModel);

const protectedRoutes = async (req, res, next) => {
  try {
    //1- check if token is exist
    const token = req.cookies.token;
    console.log("token => ", token);

    //2- verfy token
    const { id } = JWT.verify(token, JWT_SECRET_KEY);

    //3- check if user still exist
    const user = await userMethods.getById(id);

    if (!user || user.role !== "admin") {
      return res.status(401).render("error", {
        message: "401 You are not authorized to access this",
        back_url: "/register/signup",
      });
    }

    next();
  } catch (e) {
    res.status(401).render("error", {
      message: "401 You are not authorized to access this",
      back_url: "/register/signup",
    });
  }
};

module.exports = protectedRoutes;
