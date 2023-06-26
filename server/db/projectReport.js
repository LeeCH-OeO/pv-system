const mongoose = require("mongoose");
require("dotenv").config();
const projectReport = require("./schema/projectReport");
mongoose.connect(process.env.MONGO_URL);

async function dbSaveProjectReport(data) {
  console.log("from save project", data);
  await projectReport.create({
    projectName: data.projectName,
    productOutPut: data.outputList,
    startDate: data.startDate,
    endDate: data.endDate,
  });
}
async function dbGetPorjectReport(data) {
  const result = await projectReport.findOne({ projectName: data.projectName });
  console.log("get report ", result);
  if (result) {
    return result;
  }
}
module.exports = { dbSaveProjectReport, dbGetPorjectReport };
