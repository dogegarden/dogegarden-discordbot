const axios = require("axios");
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    let embed = new MessageEmbed()
        .setAuthor("DogeGarden | Invite", client.user.avatarURL())
        .setFooter(`dogegarden.net`)
        .setTimestamp()
        .setDescription(
            `Invite Me: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3534400&scope=bot`
        )
        .setColor("#e6bc6a");
    message.channel.send(embed);
};

exports.help = {
    name: "invite",
    aliases: ["inv"],
    description: "Get an invite for the bot",
    usage: "",
};
