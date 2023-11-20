const mongoose = require("mongoose");
const { Schema } = mongoose;

const ngoSchema = new Schema({
  name: { type: String, required: true },
  details: { type: String },
  address: { type: String },
  contact: {
    phone: { type: String },
    email: { type: String },
  },
});
const adminSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default: "admin" },
  ngoInformation: [ngoSchema],
  status: { type: String, required: true, default: "pending" },
  salt: Buffer,
});

exports.Admin = mongoose.model('Admin', adminSchema);