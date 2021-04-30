const { MessageEmbed } = require('discord.js');
const Calls = require('../utils/monk');

exports.run = async (client, message, args) => {
    let guild = await Calls.guild(message.guild.id)
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Help', client.user.avatarURL())
    .setFooter(`dogegarden.net`).setTimestamp()
    .setDescription('List of commands.')
    .addField(guild.guild_prefix + 'rooms', 'Display all the current rooms.', true)
    .addField(guild.guild_prefix + 'bots', 'Display all the current bots online.', true)
    .addField(guild.guild_prefix + 'counter', 'Display commands and info for the live statistics system.', true)
    .addField(guild.guild_prefix + 'statistics', 'Display statistics of the site.', true)
    .addField(guild.guild_prefix + 'invite', 'Invite the bot to your server.', true)
    .setColor('#e6bc6a')
    message.channel.send(embed)

};

exports.help = {
    name: 'help'
};