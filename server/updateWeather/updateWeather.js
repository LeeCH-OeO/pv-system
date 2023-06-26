const { dbGetProduct } = require("../db/userProduct");
const { dbAddTodayWeatherData } = require("../db/weatherData");

async function updateWeather(data) {
  const productList = await dbGetProduct({ createBy: data.userID });
  productList.map(async (item) => {
    await dbAddTodayWeatherData(item);
  });
}
module.exports = { updateWeather };
