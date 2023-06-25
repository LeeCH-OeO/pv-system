const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const userproductlocation = require("./schema/userProductLocations");
const { dbAddWeatherData } = require("../db/weatherData");
const { dbSearchProduct } = require("./companyProduct");
const { pvWatt } = require("../pvwatt/pvwatt");
async function dbAddProductLocation(data) {
  const queryResult = await userproductlocation.find({
    lon: data.lon,
    lat: data.lat,
  });
  if (queryResult.length === 0) {
    const companyProduct = await dbSearchProduct({
      productName: data.companyProductID,
    });
    await userproductlocation.create(data);
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
      dbAddWeatherData({
        ...item,
        lat: data.lat,
        lon: data.lon,
        productID: data.productID,
      });
    });
  }
}
async function dbLocationList() {
  const queryResult = await userproductlocation.find();
  if (queryResult.length !== 0) return queryResult;
}
function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}

module.exports = { dbAddProductLocation, dbLocationList };
