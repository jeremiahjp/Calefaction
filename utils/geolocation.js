const geoAPIKey = require('../config.json').GeocodingAPI;
const axios = require('axios');

const getGeoCoords = async(address) => {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address='${address}'&key=${geoAPIKey}`;

    let useAxios = true;
    if (useAxios) {
        const response = await axios.get(url);
        const coordinateData = {};
        
        if (!response.data.results[0]) {
            return false;
        }

        coordinateData.lat = response.data.results[0].geometry.location.lat;
        coordinateData.lng = response.data.results[0].geometry.location.lng;
        coordinateData.address = response.data.results[0].formatted_address;

        return coordinateData;
    }
}

module.exports = getGeoCoords;
