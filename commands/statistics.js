const axios = require('axios');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setTitle('Statistics')
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setColor('#e6bc6a')
    axios.get('https://api.dogehouse.xyz/v1/statistics')
  .then(function (response) {
    let stats = response.data
    embed.addField('Total Rooms', stats.totalRooms)
    embed.addField('Total Scheduled Rooms', stats.totalScheduledRooms)
    embed.addField('Total Online', stats.totalOnline)
    message.channel.send(embed)
}).catch(function (error) {
    message.channel.send(`Sorry, I had trouble finding the doges! \`${error}\``)
  })
};

exports.help = {
    name: 'statistics'
};