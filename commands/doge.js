const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Statistics', client.user.avatarURL())
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setColor('#e6bc6a')
    fetch("https://dog.ceo/api/breeds/image/random").then(r => {
        return r.json();
    }).then(response => {
embed.setImage(response.message);
message.channel.send(embed);
    }).catch(err => {
        
            console.log(err)
        
    })
}