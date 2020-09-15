const config = require("../../config.json")

module.exports = {
    name: "restart",
    category: "owner",
    run: async (client, message, args) => {
        if (message.author.id != config.owner_id) return message.reply("you do not have permission to use this command!")
        await message.channel.send(`Restarting bot...`)
        process.exit();
    }
}