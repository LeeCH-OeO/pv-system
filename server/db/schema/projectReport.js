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
  startDate: String,
  endDate: String,
});

module.exports = mongoose.model("projectReport", projectReportSchema);
