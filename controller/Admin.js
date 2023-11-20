const { Admin } = require("../Model/Admin");
const { sanitizeUser } = require("../Services/Comman");
const crypto = require("crypto");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");

exports.createAdminReq = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const admin = new Admin({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        const doc = await admin.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) res.status(404).json(err);
          else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAdminReq = async (req, res) => {
  try {
    const adminReq = await Admin.find({ status: "pending" });
    delete adminReq.password;
    delete adminReq.salt;
    res.status(200).json(adminReq);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const updatedAdmin = await Admin.findByIdAndUpdate(id, {
      status: "approved",
    }, { new: true });
    if (updatedAdmin) {
      res.status(201).json(updatedAdmin);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.rejectAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAdmin = await Admin.findByIdAndUpdate(id, {
      status: "rejected",
    } , { new: true });
    if (updatedAdmin) {
      res.status(201).json(updatedAdmin);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.fetchAllAdmin = async (req, res) => {
  try {
    const adminList = await Admin.find({ status: "approved" });
    if (adminList) {
      res.status(200).json(adminList);
    } else {
      res.status(404).json({ message: "admins not found" });
    }
  } catch (error) {}
};


exports.loginAdmin = async (req, res) => {
  console.log(req.admin, req.user);
  res
    .cookie("jwtadmin", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user);
};



// exports.loginUser = async (req, res) => {
//   res
//     .cookie("jwt", req.user.token, {
//       expires: new Date(Date.now() + 3600000),
//       httpOnly: true,
//     })
//     .status(201)
//     .json(req.user);
// };

exports.checkAdmin = async (req, res) => {
  res.json({ status: "Success!", admin: req.user });
};
