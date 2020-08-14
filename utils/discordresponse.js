const Discord = require('discord.js');

const DiscordResponse = (message) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(message.title)
    .setAuthor(`${message.author_title ? message.author_title : ''}`, `${message.author_icon ? message.author_icon : ''}`, ``)
    .setDescription(message.description)
    .addFields(message.fields.length ?  {} : message.fields)
    .setColor(message.color)
    .setImage(message.image)
    .setThumbnail(message.thumbnail)
    .setTimestamp()
    .setFooter(message.footer);

    return embed;
}

module.exports = DiscordResponse;