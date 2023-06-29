const { dbGetProduct } = require("../db/userProduct");
const { weatherDataList } = require("../db/weatherData");
const { dbSaveProjectReport } = require("../db/projectReport");
const { reportEmail } = require("../email/sendMail");
const { dbFindUser } = require("../db/User");
async function createReport(data) {
  const productList = await dbGetProduct({ projectID: data._id });
  const dateList = getDatesInRange(data.start, data.end);
  let outputList = await Promise.all(
    productList.map(async (item) => {
      let wattSum = 0;

      for (let i = 0; i < dateList.length; i++) {
        const weatherData = await weatherDataList({
          productID: item._id,
          date: dateList[i],
        });
        wattSum += weatherData.rate;
      }
      return {
        companyProductName: item.companyProductID,
        lat: item.lat,
        lon: item.lon,
        output: wattSum,
      };
    })
  );

  await dbSaveProjectReport({
    projectName: data.projectName,
    outputList: outputList,
    startDate: data.start,
    endDate: data.end,
  });
  const userEmail = await dbFindUser({ _id: data.createBy });
  console.log("email", userEmail.email);
  reportEmail({
    projectName: data.projectName,
    outputList: outputList,
    startDate: data.start,
    endDate: data.end,
    email: userEmail.email,
  });
}

function getDatesInRange(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

module.exports = { createReport };
