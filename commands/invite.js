const axios = require('axios');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Invite', client.user.avatarURL())
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setDescription('Invite Me: https://discord.com/api/oauth2/authorize?client_id=820919742599659522&permissions=3534400&scope=bot')
    .setColor('#e6bc6a')
    message.channel.send(embed)

};

exports.help = {
    name: 'invite',
    description: 'Invite the bot to your server.'
};