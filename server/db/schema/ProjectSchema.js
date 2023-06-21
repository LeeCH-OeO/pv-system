const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  projectName: String,
  isActive: Boolean,
  createBy: String,
});
module.exports = mongoose.model("Project", projectSchema);
