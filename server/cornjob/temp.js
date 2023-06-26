const cron = require("node-cron");

const { dbGetProduct } = require("../db/userProduct");
const { dbAddYesterdayWeatherData } = require("../db/weatherData");
const { dbProjectList, dbFinishProject } = require("../db/project");
const tempCron = cron.schedule("0 3 * * *", async () => {
  // Log the current time
  const currentTime = new Date().toLocaleTimeString();
  console.log("Current time:", currentTime);
  const productList = await dbGetProduct({});
  productList.map(async (item) => {
    await dbAddYesterdayWeatherData(item);
  });

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().slice(0, 10);
  // Date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 31);
  const thirtyDaysAgoString = thirtyDaysAgo.toISOString().slice(0, 10);

  const projectList = await dbProjectList();
  projectList.map(async (item) => {
    if (isDate30DaysAgo(item.createAt.split("T")[0])) {
      await dbFinishProject({
        _id: item._id,
        createBy: item.createBy,
        projectName: item.projectName,
        start: thirtyDaysAgoString,
        end: yesterdayString,
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
