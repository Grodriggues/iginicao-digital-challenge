const express = require("express");
const router = express.Router();
const auth = require("../controller/midleware-auth-controller");
const {
  createAdmProfile,
  getAdmProfile,
  deleteAdmProfile,
  updateAdmProfile,
  loginAdmProfile,
  logoutAdmProfile
} = require("../controller/admistrators-controller");

//--> Open routes
router.post("/signup",createAdmProfile);
router.post("/login",loginAdmProfile);

//--> Protected routes
router.get("/",auth,getAdmProfile);
router.delete("/",deleteAdmProfile);
router.post("/logout",auth,logoutAdmProfile);
router.patch("/myaccount",auth,updateAdmProfile);




module.exports = router;
