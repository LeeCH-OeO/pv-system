const mongoose = require("mongoose");
require("dotenv").config();
const Conpany = require("./schema/CompanySchema");
mongoose.connect(process.env.MONGO_COMPANY_URL);

async function dbAddCompany(companyInfo) {
  const newCompany = await Conpany.create(companyInfo);
  console.log(newCompany._id);
  return newCompany._id;
}
async function dbCheckCompanyExist(Data) {
  const result = await Conpany.findOne({ $or: Data });
  if (result) {
    return result;
  } else {
    return false;
  }
}
async function dbFindCompany(Data) {
  const result = await Conpany.findOne(Data);
  if (result) {
    return result;
  } else {
    return false;
  }
}
module.exports = {
  dbAddCompany,
  dbCheckCompanyExist,
  dbFindCompany,
};
