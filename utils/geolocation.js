const geoAPIKey = require('../config.json').GeocodingAPI;
const axios = require('axios');
const ZERO_RESULTS = 'ZERO_RESULTS';
const OK = 'OK';
const ERROR = 'ERROR';

const getGeoCoords = async(address) => {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address='${address}'&key=${geoAPIKey}`;

    let useAxios = true;
    if (useAxios) {
        const response = await axios.get(url);
        const coordinateData = {};
        if (response.data.status === ZERO_RESULTS) {
            return ZERO_RESULTS;
        }
        else if (response.data.status === OK) {
            coordinateData.lat = response.data.results[0].geometry.location.lat;
            coordinateData.lng = response.data.results[0].geometry.location.lng;
            coordinateData.address = response.data.results[0].formatted_address;

            return coordinateData;
        }

        else {
            console.error('Something happened with Google Maps API');
            return ERROR;
        }
    }
}

module.exports = getGeoCoords;
