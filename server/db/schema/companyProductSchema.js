const mongoose = require("mongoose");
const companyProductSchema = new mongoose.Schema({
  area: Number,
  orientation: String,
  tilt: Number,
  productName: String,
  createBy: String,
});
module.exports = mongoose.model("companyproduct", companyProductSchema);
