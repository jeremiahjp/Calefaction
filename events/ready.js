const Discord = require("discord.js");
const cooldowns = new Discord.Collection();
const client = new Discord.Client();
const config = require("../config.json");


module.exports = (client, message) => {
    console.log('ready');
};