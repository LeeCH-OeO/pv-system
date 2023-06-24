const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const userproductlocation = require("./schema/userProductLocations");

async function dbAddProductLocation(data) {
  console.log(data);
  const queryResult = await userproductlocation.find({
    lon: data.lon,
    lat: data.lat,
  });
  if (queryResult.length === 0) {
    await userproductlocation.create(data);
  }
}
async function dbLocationList() {
  const queryResult = await userproductlocation.find();
  if (queryResult.length !== 0) return queryResult;
}
module.exports = { dbAddProductLocation, dbLocationList };
