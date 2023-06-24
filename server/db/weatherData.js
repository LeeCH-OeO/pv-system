const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const weatherData = require("./schema/weatherData");

async function dbAddWeatherData(data) {
  weatherData.create(data);
}

module.exports = { dbAddWeatherData };
