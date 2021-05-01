const axios = require('axios');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Statistics', client.user.avatarURL())
    .setFooter(`dogegarden.net`).setTimestamp()
    .setColor('#e6bc6a')
    axios.get('https://api.dogegarden.net/v1/statistics')
  .then(function (response) {
    let stats = response.data
    embed.addField('Rooms', stats.totalRooms)
    embed.addField('Scheduled Rooms', stats.totalScheduledRooms)
    embed.addField('Registered Users', stats.totalRegistered)
    embed.addField('Online', stats.totalOnline)
    embed.addField('Bots Online', stats.totalBotsOnline)
    message.channel.send(embed)
}).catch(function (error) {
    message.channel.send(`Sorry, I had trouble finding the doges! \`${error}\``)
  })
};

exports.help = {
    name: 'statistics',
    aliases: ['stats'],
    description: 'Get statistics of dogehouse',
    usage: ''
};
