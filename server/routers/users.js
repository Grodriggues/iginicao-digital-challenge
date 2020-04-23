const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  postNewUser,
  getUserById,
  deleteUserById,
  updateUserById
} = require("../controller/users-controller");
const auth = require("../controller/midleware-auth-controller");

//--> Protected route /api/users

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", postNewUser);
router.delete("/:id", deleteUserById);
router.patch("/:id", updateUserById);


module.exports = router;
