const { MessageEmbed } = require('discord.js');
const Calls = require('../utils/monk')

exports.run = async (client, message, args) => {

    message.channel.send( `ping: ${Math.round(client.ws.ping)}` )
    
};

exports.help = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Get the ping of the bot',
    usage: ''
};
