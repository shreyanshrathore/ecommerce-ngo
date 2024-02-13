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
  .get("/req", fetchAdminReq)
  .put("/new/:id",  createAdmin)
  .put("/reject/:id",  rejectAdmin)
  .get("/",  fetchAllAdmin)
  .post("/login",  loginAdmin)
  .post("/check",  checkAdmin);
module.exports = router;
