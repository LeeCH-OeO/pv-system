const mongoose = require("mongoose");
const userProductLocationSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  productID: String,
});
module.exports = mongoose.model(
  "userproductlocation",
  userProductLocationSchema
);
