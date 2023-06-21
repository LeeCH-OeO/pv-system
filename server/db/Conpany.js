const mongoose = require("mongoose");
require("dotenv").config();
const Company = require("./schema/CompanySchema");
mongoose.connect(process.env.MONGO_URL);

async function dbAddCompany(companyInfo) {
  const newCompany = await Company.create(companyInfo);
  console.log(newCompany._id);
  return newCompany._id;
}
async function dbCheckCompanyExist(Data) {
  const result = await Company.findOne({ $or: Data });
  if (result) {
    return result;
  } else {
    return false;
  }
}
async function dbFindCompany(Data) {
  const result = await Company.findOne(Data);
  if (result) {
    return result;
  } else {
    return false;
  }
}

async function dbUpdateCompany(Data) {
  const updatedData = Data.data;
  await Company.findByIdAndUpdate(
    Data.id,
    { $set: updatedData },
    {
      new: true,
    }
  );
}
async function dbDeleteCompany(ID) {
  await Company.findByIdAndDelete(ID);
}
module.exports = {
  dbAddCompany,
  dbCheckCompanyExist,
  dbFindCompany,
  dbUpdateCompany,
  dbDeleteCompany,
};
