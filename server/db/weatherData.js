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
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  let yesterdayString = yesterday.toISOString().split("T")[0];

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
    endDate: yesterdayString,
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
  const companyProduct = await dbSearchProduct({
    productName: data.companyProductID,
  });

  let currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  let yesterdayString = yesterday.toISOString().split("T")[0];
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
    endDate: yesterdayString,
    systemLoss: companyProduct.systemLoss,
    powerPeak: companyProduct.powerPeak,
    orientation: companyProduct.orientation,
    tilt: companyProduct.tilt,
    area: companyProduct.area,
  });

  const deleteresult = await weatherData.deleteMany({
    productID: data.productID,
  });
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

async function dbAddYesterdayWeatherData(data) {
  const companyProduct = await dbSearchProduct({
    productName: data.companyProductID,
  });
  let currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  let yesterdayString = yesterday.toISOString().split("T")[0];

  const result = await pvWatt({
    latitude: data.lat,
    longitude: data.lon,
    startDate: yesterdayString,
    endDate: yesterdayString,
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
      productID: data._id,
    });
  });
}

async function dbDeleteWeatherData(data) {
  await weatherData.deleteMany(data);
}

async function dbAddTodayWeatherData(data) {
  const companyProduct = await dbSearchProduct({
    productName: data.companyProductID,
  });
  let currentDate = new Date();

  let todayString = currentDate.toISOString().split("T")[0];

  const result = await pvWatt({
    latitude: data.lat,
    longitude: data.lon,
    startDate: todayString,
    endDate: todayString,
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
      productID: data._id,
    });
  });
}

async function weatherDataList(data) {
  const result = await weatherData.findOne(data);
  return result;
}
function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}
module.exports = {
  dbAddWeatherData,
  dbUpdateWeatherData,
  dbDeleteWeatherData,
  dbAddYesterdayWeatherData,
  weatherDataList,
  dbAddTodayWeatherData,
};
