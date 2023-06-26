const cron = require("node-cron");

const { dbGetProduct } = require("../db/userProduct");
const { dbAddYesterdayWeatherData } = require("../db/weatherData");
const { dbProjectList, dbFinishProject } = require("../db/project");
const tempCron = cron.schedule("*/10 * * * * *", async () => {
  // Log the current time
  const currentTime = new Date().toLocaleTimeString();
  console.log("Current time:", currentTime);
  // const productList = await dbGetProduct({});
  // productList.map(async (item) => {
  //   await dbAddYesterdayWeatherData(item);
  // });
  const projectList = await dbProjectList();
  projectList.map(async (item) => {
    // console.log(item.createAt.split("T")[0]);
    // console.log(
    //   "is 30 days age? ",
    //   isDate30DaysAgo(item.createAt.split("T")[0])
    // );
    if (isDate30DaysAgo(item.createAt.split("T")[0])) {
      await dbFinishProject({
        projectName: item.projectName,
        createBy: item.createBy,
      });
    }
  });
});
function isDate30DaysAgo(dateString) {
  // Convert the date string to a Date object
  let date = new Date(dateString);

  // Get the current date
  let today = new Date();

  // Calculate the date 30 days ago
  let thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Compare the given date with the date 30 days ago
  return date.getTime() < thirtyDaysAgo.getTime();
}
module.exports = { tempCron };
