const axios = require('axios');
const openWeatherAPI = require('../../config.json').openWeatherAPI;
const getGeoCoords = require('../../utils/geolocation');
const DiscordResponse = require('../../utils/discordresponse');
const ZERO_RESULTS = 'ZERO_RESULTS';

module.exports = {
    name: "current",
    description: "Provides current weather forcast for geolocation.",
    usage: "<geolocation>",
    args: false,
    async run(client, message, args) {

        const weatherData = {};

        getGeoCoords(args.join(" ")).then(data => {
            if (data === ZERO_RESULTS) {

                const embedMessage = {};
                embedMessage.title = 'Calefaction'
                embedMessage.author_title = '';
                embedMessage.author_icon = 'https://i.imgur.com/oN4b3wo.png';
                embedMessage.thumbnail = 'https://i.imgur.com/qmiZDuC.png';
                embedMessage.description = `Unable to find geolocation.`
                embedMessage.fields = []
                embedMessage.color = Math.floor(Math.random() * 16777214+ 1);
                embedMessage.footer = 'Google Maps API & OpenWeather API';
                
                const embed = DiscordResponse(embedMessage);
                message.channel.send(embed);
                return;
            }

            const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=hourly,daily&&units=imperial&appid=${openWeatherAPI}`;
            const weatherResp = axios.get(weatherURL);

            weatherResp.then(resp => {
                weatherData.timezone = resp.data.current.timezone;
                weatherData.current = resp.data.current;
                weatherData.weather = resp.data.current.weather

                const embedMessage = {};
                embedMessage.title = 'Calefaction'
                embedMessage.author_title = '';
                embedMessage.author_icon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
                embedMessage.description = `[Weather in ${data.address}](https://www.google.com/maps/@${data.lat},${data.lng},13z '${data.address}')`
                embedMessage.fields = [{ name: 'Temperature', value: `${Math.round(weatherData.current.temp)}°F`, inline: true },
                                       { name: `Feel`, value: `${Math.round(weatherData.current.feels_like)}°F`, inline: true},
                                       { name: 'Sky', value: `${weatherData.weather[0].description.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}`, inline: true },
                                       { name: 'UV Index', value: `${Math.round(weatherData.current.uvi)}`, inline: true},
                                       { name: `Humidity`, value: `${weatherData.current.humidity}%`, inline: true}
                                      ]
                embedMessage.color = Math.floor(Math.random() * 16777214+ 1);
                embedMessage.thumbnail = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
                embedMessage.footer = 'Google Maps API & OpenWeather API';
                const embed = DiscordResponse(embedMessage);
                message.channel.send(embed);
            });
        })
    }
}