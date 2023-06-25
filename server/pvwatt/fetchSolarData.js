const axios = require("axios");

const fetchSolarData = async ({ latitude, longitude, startDate, endDate }) => {
  const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=cloudcover_mean&models=MPI_ESM1_2_XR`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch solar data");
  }
  return solarData;
};

module.exports = { fetchSolarData };
