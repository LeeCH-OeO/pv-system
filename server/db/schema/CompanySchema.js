const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  companyName: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("Company", companySchema);
