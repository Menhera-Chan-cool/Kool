const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unban a user",
    usage: "-unban <userid>",
    run: async (client, message, args) => {

        const member = args[0];

        if (!member) {
             return message.channel.send(`Please enter a id!`)
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(`${member} has been unbanned!`)
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

    }
}
