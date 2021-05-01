const { MessageEmbed } = require('discord.js');
const Calls = require('../utils/monk')

exports.run = async (client, message, args) => {
    let thingo = await Calls.guild(message.guild.id)
    message.channel.send(thingo.guild_id)

};

exports.help = {
    name: 'ping',
    description: "Displays the bots ping."
};