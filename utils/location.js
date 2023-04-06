const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "";

/**/
async function getCoordsForAddress(address) {
  //Here we would write the code to fetch the google API in order to get the coordinates from the address. Instead, I'll just send back a dummy coordinates set.
  return { lat: 40.7484474, lng: -73.9871516 };
}

/*Function to get data from Google
See more at: https://developers.google.com/maps/documentation/geocoding/start


export async function getCoordsForAddress(address) {
  const response = await axios.get(`
    https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}
    `);

  const { data } = axios;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("Could not find location!", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

*/

module.exports = { getCoordsForAddress };
