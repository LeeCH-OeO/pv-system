const cron = require("node-cron");
const { dbLocationList } = require("../db/userProductLocation");
const { dbAddWeatherData } = require("../db/weatherData");
const axios = require("axios");
require("dotenv").config();

const tempCron = cron.schedule("*/10 * * * * *", async () => {
  // Log the current time
  const currentTime = new Date().toLocaleTimeString();
  console.log("Current time:", currentTime);
  const locationList = await dbLocationList();
  //   console.log(locationList);
  locationList.map(async (item) => {
    const result = await axios({
      methon: "get",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${item.lat}&lon=${item.lon}&appid=${process.env.WEATER_API}`,
    });
    console.log(
      item.lat,
      item.lon,
      result.data.daily[0].sunrise,
      result.data.daily[0].sunset,
      result.data.daily[0].clouds
    );
    dbAddWeatherData({
      lat: item.lat,
      lon: item.lon,
      sunrise: result.data.daily[0].sunrise,
      sunset: result.data.daily[0].sunset,
      clouds: result.data.daily[0].clouds,
    });
  });
});

module.exports = { tempCron };
