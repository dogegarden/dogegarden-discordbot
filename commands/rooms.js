const axios = require('axios');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setAuthor('DogeGarden | Rooms', client.user.avatarURL())
    .setFooter(`dogehouse.xyz`).setTimestamp()
    .setColor('#e6bc6a')
    axios.get('https://api.dogehouse.xyz/v1/popularRooms')
  .then(function (response) {
    let rooms = response.data.rooms
    embed.setDescription(`Showing \`${rooms.length}\` rooms.`)
    rooms.forEach(room => {
        let description;
        description = `\`\`\`${room.description}\`\`\``
        if (room.description.length == 0) description = `\`\`\`fix\nThis room doesn't have a description\`\`\``

        function msToTime(duration) {// time needs redone... TODO.
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;
          
          return hours + " hours " + minutes + " minutes "
        }
        let myDate = new Date(room.inserted_at);
        let withOffset = myDate.getTime();
        embed.addField(`🏠 ${room.name} 👥 ${room.numPeopleInside} ⏱️ ${msToTime(withOffset)}`, ` **[➡️ Join Room](https://dogehouse.tv/room/${room.id})**\n${description}\n`)
    });
    message.channel.send(embed)
}).catch(function (error) {
    message.channel.send(`Sorry, I had trouble finding the doges! \`${error}\``)
    console.log(error)
  })
};

exports.help = {
    name: 'rooms'
};