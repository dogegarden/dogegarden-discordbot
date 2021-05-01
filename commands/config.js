exports.run = async (client, message, args) => {
    const { MessageEmbed } = require('discord.js');
    let Calls = require('../utils/monk')

    if (!message.member.hasPermission('ADMINISTRATOR')) return
    message.channel.send('Insufficient permissions: Administrator permissions are required to run this command.');

    let setting = args[0]
    let updated = args.slice(1).join(' ')

    let guild = await Calls.guild(message.guild.id)

    switch (setting) {
        case 'prefix': {
            if (updated) {
                try {
                    await Calls.updateGuild(message.guild.id, "guild_prefix", updated);
                    return message.channel.send(`Prefix has been updated to: \`${updated}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            await message.channel.send(`Current prefix: \`${guild.guild_prefix}\``);
            break;
        }

        default: {
            const default_config = new MessageEmbed()
            .setAuthor('DogeGarden', client.user.avatarURL())
            .setDescription(`To change a config value, simply do \`${guild.guild_prefix || 'Error gathering guild information.'}config <option>\` to change it!\n[**Documentation**](https://docs.dogehouse.xyz)`)
            .addField('Base', `• Prefix: \`${guild.guild_prefix}\``, true)
            .addField('Live Counters', `• Enabled: ${guild.guild_counterEnabled}`, true)
            await message.channel.send(default_config)
            break;
        }
    }   
}

exports.help = {
    name: 'config',
    description: 'Edit the bots configuration.'
};