const mongoose = require("mongoose");
const weatherData = new mongoose.Schema({
  lat: Number,
  lon: Number,
  sunrise: Number,
  sunset: Number,
  clouds: Number,
});
module.exports = mongoose.model("weatherData", weatherData);
