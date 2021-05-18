const { Collection, MessageAttachment, MessageEmbed } = require("discord.js");

const ms = require("pretty-ms");
const Calls = require("../utils/monk");
/**
 * @type {Collection<string, boolean>}
 */
const Cooldown = new Collection();

/**
 * @type {Collection<string, Collection<string, number>>}
 */
const cooldowns = new Collection();

/**
 * @param {import('../classes/Doge')} client
 * @param {import('discord.js').Message} message
 */
module.exports = async (client, message) => {
    let guild = await Calls.guild(message.guild.id);
    let prefix = guild.guild_prefix;
    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.member || message.member.partial) await message.member.fetch();

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd =
        client.commands.get(command) ||
        client.commands.find(
            (c) => c.help.aliases && c.help.aliases.includes(command)
        );

    if (!cmd) return;

    if (
        cmd.help.permission &&
        !message.member.roles.cache.find((r) => r.name === cmd.help.permission)
    )
        return;

    if (!cooldowns.has(cmd.name)) cooldowns.set(cmd.name, new Collection());
    const now = Date.now();
    const timestamps = cooldowns.get(cmd.name);
    const cooldownAmount = cmd.help.cooldown || 3000;
    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = Math.floor(expirationTime - now);
            return message.channel.send(
                `Please wait **${ms(
                    timeLeft
                )}** before reusing the command again.`
            );
        }
    }

    try {
        await cmd.run(client, message, args);
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } catch (e) {
        console.log(e);
    }
};
