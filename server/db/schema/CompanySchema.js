const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  companyName: String,
  email: String,
  password: String,
  image: String,
});
module.exports = mongoose.model("Company", companySchema);
