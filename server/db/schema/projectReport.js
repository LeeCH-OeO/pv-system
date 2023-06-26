const mongoose = require("mongoose");
const productOutPut = new mongoose.Schema({
  lat: Number,
  lon: Number,
  output: Number,
  companyProductName: String,
});
const projectReportSchema = new mongoose.Schema({
  projectName: String,
  productOutPut: [productOutPut],
});

module.exports = mongoose.model("projectReport", projectReportSchema);
