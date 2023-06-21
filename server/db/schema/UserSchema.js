const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  isUnlimited: Boolean,
  image: String,
  isActive: Boolean,
});
module.exports = mongoose.model("User", userSchema);
