const mongoose = require("mongoose");
const companyProductSchema = new mongoose.Schema({
  area: Number,
  orientation: Number,
  tilt: Number,
  productName: String,
  createBy: String,
  powerPeak: Number,
  systemLoss: Number,
});
module.exports = mongoose.model("companyproduct", companyProductSchema);
