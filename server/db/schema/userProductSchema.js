const mongoose = require("mongoose");
const userProductSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  companyProductID: String,
  projectID: String,
  createBy: String,
  createAt: String,
});
module.exports = mongoose.model("userProduct", userProductSchema);
