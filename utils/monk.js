let monk = require('monk');
require('dotenv').config()
let db = monk(process.env.MONGO_URL);

class Calls {
    static async guild(guild_id) {
        let guild_data = {
            guild_id: guild_id,
            guild_cat: '',
            guild_rooms: '',
            guild_users: '',
            guild_bots: '',
            guild_counterEnabled: false,
            guild_prefix: '!'
        }
        let collection = db.get('guilds');
        let guild = await collection.findOne({ guild_id: guild_id })
        if (guild === null) {
            return (await collection.insert(guild_data))
        } else {
            return (await guild)
        }
    }

    static async updateGuild(guild_id, type, value) {
        let collection = db.get('guilds');
        return (await collection.findOneAndUpdate({ guild_id: guild_id }, { $set: { [type]: value }}))
    }

    static async getAllGuilds() {
        let collection = db.get('guilds');
        return (await collection.find({}))
    }
}

module.exports = Calls;