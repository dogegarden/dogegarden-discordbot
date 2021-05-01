const { MessageEmbed } = require('discord.js');
const Calls = require('../utils/monk');

exports.run = async (client, message, args) => {
    let commandFields = []
    client.commands.array.forEach(command => {
        let field = new Object()
        field.name = command.help.name
        field.value = command.help.description 
        field.inline = true 
        commandFields.push(field)
    });
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Help', client.user.avatarURL())
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setDescription('List of commands.')
    .addFields(commandFields)
    .setColor('#e6bc6a')
    message.channel.send(embed)

};

exports.help = {
    name: 'help',
    description: 'Display all the bot commands.'
};
