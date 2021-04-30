const { MessageEmbed } = require('discord.js');
const Calls = require('../utils/monk');

exports.run = async (client, message, args) => {
    let guild = await Calls.guild(message.guild.id)
        var allcmds = "";

        this.commands.forEach(cmd => {
            let cmdinfo = cmd
            allcmds+="`"+guild.guild_prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor('DogeGarden | Help', client.user.avatarURL())
        .setColor("#e6bc6a")
        .setDescription(allcmds)
        .setFooter(`To get info of each command you can do ${guild.guild_prefix}help [command]`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = this.commands.get(cmd)
            if(!command)command = this.commands.find(x => x.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")
            let commandinfo = new MessageEmbed()
            .setTitle("Command: "+command.name+" info")
            .setColor("#e6bc6a")
            .setDescription(`
Name: ${command.name}
Description: ${command.description}
Usage: \`\`${guild.guild_prefix}${command.name} ${command.usage}\`\`
Aliases: ${command.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
exports.help = {
    name: 'help'
};
