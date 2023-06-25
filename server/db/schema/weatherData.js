const mongoose = require("mongoose");
const weatherData = new mongoose.Schema({
  lat: Number,
  lon: Number,
  date: String,
  rate: Number,
  productID: String,
});
module.exports = mongoose.model("weatherData", weatherData);
