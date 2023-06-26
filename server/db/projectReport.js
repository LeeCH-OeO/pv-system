const mongoose = require("mongoose");
require("dotenv").config();
const projectReport = require("./schema/projectReport");
mongoose.connect(process.env.MONGO_URL);

async function dbSaveProjectReport(data) {
  console.log("from save project", data);
  await projectReport.create({
    projectName: data.projectName,
    productOutPut: data.outputList,
  });
}
module.exports = { dbSaveProjectReport };
