const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const weatherData = require("./schema/weatherData");
const { dbSearchProduct } = require("./companyProduct");
const { pvWatt } = require("../pvwatt/pvwatt");

async function dbAddWeatherData(data) {
  const companyProduct = await dbSearchProduct({
    productName: data.companyProductID,
  });
  let currentDate = new Date();
  const currentDateStr = new Date().toISOString().split("T")[0];
  let oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  let year = oneYearAgo.getFullYear();
  let month = oneYearAgo.getMonth() + 1;
  let day = oneYearAgo.getDate();

  let formattedDate =
    year + "-" + addLeadingZero(month) + "-" + addLeadingZero(day);
  const result = await pvWatt({
    latitude: data.lat,
    longitude: data.lon,
    startDate: formattedDate,
    endDate: currentDateStr,
    systemLoss: companyProduct.systemLoss,
    powerPeak: companyProduct.powerPeak,
    orientation: companyProduct.orientation,
    tilt: companyProduct.tilt,
    area: companyProduct.area,
  });
  result.pvWattsRate.map((item) => {
    weatherData.create({
      ...item,
      lat: data.lat,
      lon: data.lon,
      productID: data.productID,
    });
  });
}

async function dbUpdateWeatherData(data) {
  console.log("update weather data: ", data);
  const companyProduct = await dbSearchProduct({
    productName: data.companyProductID,
  });

  let currentDate = new Date();
  const currentDateStr = new Date().toISOString().split("T")[0];
  let oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  let year = oneYearAgo.getFullYear();
  let month = oneYearAgo.getMonth() + 1;
  let day = oneYearAgo.getDate();

  let formattedDate =
    year + "-" + addLeadingZero(month) + "-" + addLeadingZero(day);
  const result = await pvWatt({
    latitude: data.lat,
    longitude: data.lon,
    startDate: formattedDate,
    endDate: currentDateStr,
    systemLoss: companyProduct.systemLoss,
    powerPeak: companyProduct.powerPeak,
    orientation: companyProduct.orientation,
    tilt: companyProduct.tilt,
    area: companyProduct.area,
  });

  const deleteresult = await weatherData.deleteMany({
    productID: data.productID,
  });
  console.log(deleteresult);
  result.pvWattsRate.map(async (item) => {
    await weatherData.create({
      ...item,
      lat: data.lat,
      lon: data.lon,
      productID: data.productID,
    });
  });
}
async function dbDeleteWeatherData(data) {
  await weatherData.deleteMany(data);
}
function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}
module.exports = { dbAddWeatherData, dbUpdateWeatherData, dbDeleteWeatherData };
