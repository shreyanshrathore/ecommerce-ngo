const express = require("express");
const passport = require("passport");
const {
  createUser,
  loginUser,
  checkUser,
  fetchUserById,
  updateUser,
} = require("../controller/User");
const { isAuth } = require("../Services/Comman");
const router = express.Router();

router
  .post("/register", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .post("/check", passport.authenticate("jwt"), checkUser)
  .get("/own", fetchUserById)
  .put("/:id", updateUser);

module.exports = router;
