
const cron = require('node-cron');
require('dotenv').config()
const Calls = require('../utils/monk')
const axios = require('axios');
const message = require('./message');

module.exports = async client => {

    let guilds = await Calls.getAllGuilds()

    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(client.guilds.cache.size + ' guilds | dogehouse.xyz',  { type: 'WATCHING' })
    
    async function updateCounters() {
        let statistics = await axios.get('https://api.dogegarden.net/v1/statistics')
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

    cron.schedule("*/5 * * * *", function () {
        updateCounters()
    });

    updateCounters()

};
