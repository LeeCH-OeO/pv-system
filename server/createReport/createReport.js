const { dbGetProduct } = require("../db/userProduct");
const { weatherDataList } = require("../db/weatherData");
const { dbSaveProjectReport } = require("../db/projectReport");
async function createReport(data) {
  const productList = await dbGetProduct({ projectID: data._id });
  const dateList = [
    "2023-06-20",
    "2023-06-21",
    "2023-06-22",
    "2023-06-23",
    "2023-06-24",
    "2023-06-25",
  ];
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

  // const productList = await dbGetProduct({ projectID: data._id });

  // let outputList = await Promise.all(
  //   productList.map(async (item) => {
  //     const weatherData = await weatherDataList({
  //       productID: item._id,
  //     });
  //     const wattSum = weatherData.reduce(function (accumulator, currentObject) {
  //       return accumulator + currentObject.rate;
  //     }, 0);

  //     return {
  //       ompanyProductName: item.companyProductID,
  //       lat: item.lat,
  //       lon: item.lon,
  //       output: wattSum,
  //     };
  //   })
  // );

  await dbSaveProjectReport({
    projectName: data.projectName,
    outputList: outputList,
  });
}
module.exports = { createReport };
