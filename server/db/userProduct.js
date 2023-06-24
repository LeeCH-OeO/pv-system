const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const userProduct = require("./schema/userProductSchema");

async function dbAddUserProduct(data) {
  const result = await userProduct.create({
    ...data,
    createAt: new Date().toISOString(),
  });
  if (result) {
    console.log(new Date().toISOString());
    return result._id;
  } else return false;
}
async function dbUpdateuserProduct(data) {
  const result = await userProduct.findByIdAndUpdate(data.id, {
    $set: data.data,
  });
  if (result) {
    return true;
  } else {
    return false;
  }
}

async function dbDeleteUserProduct(ID) {
  const result = await userProduct.findByIdAndDelete(ID);
  if (result) {
    return true;
  } else {
    return false;
  }
}

async function dbIfUserHaveProduct(data) {
  const result = await userProduct.findOne(data);
  if (result) {
    return true;
  } else {
    return false;
  }
}
async function dbGetProduct(data) {
  const result = await userProduct.find(data);
  if (result) {
    return result;
  }
}
module.exports = {
  dbAddUserProduct,
  dbUpdateuserProduct,
  dbDeleteUserProduct,
  dbIfUserHaveProduct,
  dbGetProduct,
};
