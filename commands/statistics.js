const axios = require('axios');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Statistics', client.user.avatarURL())
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setColor('#e6bc6a')
    axios.get('https://api.dogegarden.net/v1/statistics')
  .then(function (response) {
    let stats = response.data
    embed.addField('Total Rooms', stats.totalRooms)
    embed.addField('Total Scheduled Rooms', stats.totalScheduledRooms)
    embed.addField('Total Online', stats.totalOnline)
    embed.addField('Total Bots Online', stats.totalBotsOnline)
    message.channel.send(embed)
}).catch(function (error) {
    message.channel.send(`Sorry, I had trouble finding the doges! \`${error}\``)
  })
};

exports.help = {
    name: 'statistics'
};
