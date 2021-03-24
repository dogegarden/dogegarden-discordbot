const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setTitle('Help')
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setDescription('List of commands.')
    .addField('!rooms', 'Display all the current rooms.')
    .addField('!statistics', 'Display statistics of the site.')
    .addField('!invite', 'Invite the bot to your server.')
    .setColor('#e6bc6a')
    message.channel.send(embed)

};

exports.help = {
    name: 'help'
};