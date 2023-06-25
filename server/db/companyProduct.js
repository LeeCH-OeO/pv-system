const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const companyProduct = require("./schema/companyProductSchema");

async function dbAddCompanyProduct(Data) {
  const result = await companyProduct.create(Data);
  if (result) {
    return true;
  } else {
    return false;
  }
}

async function dbUpdateCompanyProduct(Data) {
  try {
    await companyProduct.findByIdAndUpdate(Data.ID, {
      $set: Data.data,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function dbIfCompanyHaveProduct(data) {
  try {
    await companyProduct.findOne(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function dbDeleteCompanyProduct(ID) {
  try {
    await companyProduct.findByIdAndDelete(ID);
    return true;
  } catch (error) {
    return false;
  }
}

async function dbCheckCompanyProductExist(Data) {
  const result = await companyProduct.findOne({ productName: Data });
  if (result) {
    return result;
  } else {
    return false;
  }
}
async function dbCompanyProductListForUser() {
  const result = await companyProduct.find();
  if (result) {
    return result;
  } else {
    return false;
  }
}

async function dbCompanyProductListForCompany(data) {
  const result = await companyProduct.find(data);
  if (result) {
    return result;
  } else {
    return false;
  }
}
async function dbSearchProduct(data) {
  const result = await companyProduct.findOne(data);
  if (result) {
    return result;
  }
}
module.exports = {
  dbAddCompanyProduct,
  dbUpdateCompanyProduct,
  dbIfCompanyHaveProduct,
  dbDeleteCompanyProduct,
  dbCheckCompanyProductExist,
  dbCompanyProductListForUser,
  dbCompanyProductListForCompany,
  dbSearchProduct,
};
