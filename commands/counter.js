const { MessageEmbed } = require('discord.js');
const Calls = require('../utils/monk')
const axios = require('axios')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permission for this.');

    let setting = args[0]
    let updated = args.slice(1).join(' ')

    let guild = await Calls.guild(message.guild.id)

    async function updateCounters() {
        let statistics = await axios.get('https://api.dogehouse.xyz/v1/statistics')
        let guilds = await Calls.getAllGuilds()
        guilds.forEach(guild => {
            if (!guild.guild_counterEnabled) return;
            try {
            client.channels.cache.get(guild.guild_rooms).setName('Rooms: ' + statistics.data.totalRooms)
            client.channels.cache.get(guild.guild_users).setName('Users: ' + statistics.data.totalOnline)
            client.channels.cache.get(guild.guild_bots).setName('Bots: ' + statistics.data.totalBotsOnline)
            } catch (err) {
                
            }
        })
    };

    switch (setting) {
        case 'enable': {
            if (guild.guild_counterEnabled == false) {
                try {
                    let init_msg = await message.channel.send('<a:dogedance:827109784197005353> Creating Live Counters...')
    
                    if (guild.guild_counterEnabled) return message.channel.send('You already have counters enabled! If you would like to disable them do ' + guild.guild_prefix + 'counter disable')
                
                    await message.guild.channels.create('Live Statistics', {type: 'category' })
                    .then(async(category) => {
                        await init_msg.edit('<a:dogedance:827109784197005353> Creating category...')
                        await Calls.updateGuild(message.guild.id, "guild_cat", category.id)
                        message.guild.channels.create('Rooms: Doge', { type: 'voice', parent: category.id, 	permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['CONNECT'],
                            }
                        ], })
                        .then(async(rooms_channel) => { await Calls.updateGuild(message.guild.id, "guild_rooms", rooms_channel.id) 
                        await init_msg.edit('<a:dogedance:827109784197005353> Creating channels...')})
                        .catch((error) => message.channel.send('We encountered an error. Check the bot has perms to manage channels.' + error));
                        message.guild.channels.create('Users: is', { type: 'voice', parent: category.id, permissionsOverwrites: [{
                            id: message.guild.id,
                            deny: ['SEND_MESSAGES', 'CONNECT', 'SPEAK'],
                            allow: ['VIEW_CHANNEL']
                          }] })
                        .then(async(users_channel) => await Calls.updateGuild(message.guild.id, "guild_users", users_channel.id))
                        .catch((error) => message.channel.send('We encountered an error. Check the bot has perms to manage channels.' + error));
                        message.guild.channels.create('Bots: waking up', { type: 'voice', parent: category.id, permissionsOverwrites: [{
                            id: message.guild.id,
                            deny: ['SEND_MESSAGES', 'CONNECT', 'SPEAK'],
                            allow: ['VIEW_CHANNEL']
                          }] })
                        .then(async(bots_channel) => await Calls.updateGuild(message.guild.id, "guild_bots", bots_channel.id))
                        .catch((error) => message.channel.send('We encountered an error. Check the bot has perms to manage channels.' + error));
                    })
                    .catch((error) => message.channel.send('We encountered an error. Check the bot has perms to manage channels.' + error));
                    await Calls.updateGuild(message.guild.id, "guild_counterEnabled", true)
                    await new Promise(r => setTimeout(r, 3000));
                    updateCounters()
                    await init_msg.edit('<a:dogedance2:827109938790531122> Counters created!')
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            } else {
                return message.channel.send('You already have counters enabled! If you would like to disable them do ' + guild.guild_prefix + 'counter disable')
            }
            break;
        }

        case 'disable': {
            if (guild.guild_counterEnabled) {
                try {
                    await Calls.updateGuild(message.guild.id, "guild_counterEnabled", false)

                    let guild = await Calls.guild(message.guild.id)
                    let init_msg = await message.channel.send('<a:dogedance:827109784197005353> Deleting Live Counters...')

                    client.channels.cache.get(guild.guild_cat).delete()
                    await init_msg.edit('<a:dogedance:827109784197005353> Deleting category...')
                    await new Promise(r => setTimeout(r, 1000));
                    client.channels.cache.get(guild.guild_rooms).delete()
                    await init_msg.edit('<a:dogedance:827109784197005353> Deleting channels...')
                    await new Promise(r => setTimeout(r, 1000));
                    client.channels.cache.get(guild.guild_users).delete()
                    await new Promise(r => setTimeout(r, 1000));
                    client.channels.cache.get(guild.guild_bots).delete()
                    await new Promise(r => setTimeout(r, 2000));

                    await init_msg.edit('<a:dogedance2:827109938790531122> Counters disabled. To re-enable run ' + guild.guild_prefix + 'counter enable')

                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            } else {
                return message.channel.send('You already have counters disabled! If you would like to disable them do ' + guild.guild_prefix + 'counter disable')
            }
            break;
        }

        default: {
            const default_config = new MessageEmbed()
            .setAuthor('DogeGarden | Counters', client.user.avatarURL())
            .setDescription('Setup counters to show live statistics about DogeHouse in your discord server.')
            .addField(guild.guild_prefix + 'counter enable', 'Create and enable server counters')
            .addField(guild.guild_prefix + 'counter disable', 'Disable and delete your servers live counters.')
            await message.channel.send(default_config)
            break;
        }
    }   
};

exports.help = {
    name: 'counter',
    aliases: ['count'],
    description: 'Show a live counter of dogehouse stats',
    usage: ''
};
