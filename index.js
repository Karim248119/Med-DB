const cookieParser = require("cookie-parser");
const express = require("express");
const env = require("dotenv").config();
const app = express();
const mvcRoutes = require("./routes/mvcRoutes.js");
const doctorsRouter = require("./routes/doctorRoutes");
const specialityRoute = require("./routes/specialityRoute");
const apiDoctorRoutes = require("./routes/api/doctors.js");
const apiSpecialityRoutes = require("./routes/api/specialities.js");
const apiServiceRoutes = require("./routes/api/services");
const apiNewseRoutes = require("./routes/api/news");
const apiUsersRoutes = require("./routes/api/user");
const apiAppointmentsRoute = require("./routes/api/appointments.js");
const connectDb = require("./models/db.js");
const cors = require("cors");

const path = require("path");
const port = process.env.PORT;

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectDb();

app.use(
  "/api",
  apiDoctorRoutes,
  apiSpecialityRoutes,
  apiServiceRoutes,
  apiUsersRoutes,
  apiNewseRoutes,
  apiAppointmentsRoute
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
