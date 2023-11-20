const express = require("express");
const passport = require("passport");
const {
  createAdminReq,
  fetchAdminReq,
  createAdmin,
  rejectAdmin,
  fetchAllAdmin,
  loginAdmin,
  checkAdmin,
} = require("../controller/Admin");
const { isAuth, isOwner } = require("../Services/Comman");

const router = express.Router();

router
  .post("/req", createAdminReq)
  .get("/req", isOwner(), fetchAdminReq)
  .put("/new/:id", isOwner(), createAdmin)
  .put("/reject/:id", isOwner(), rejectAdmin)
  .get("/", isOwner(), fetchAllAdmin)
  .post("/login", passport.authenticate("localadmin"), loginAdmin)
  .post("/check", passport.authenticate("jwtadmin"), checkAdmin);
module.exports = router;
