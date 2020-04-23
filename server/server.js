require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Database
require("./db/mongoose");

//Initial Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

//Auth Middleware
const auth = require("./controller/midleware-auth-controller");

//Defining Routes
app.use("/api/users",auth, require("./routers/users"));
app.use("/api/adms", require("./routers/adm"));

app.listen(process.env.PORT, () => {
  console.log("server running");
});
