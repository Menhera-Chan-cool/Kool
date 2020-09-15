const discord = require('discord.js')

module.exports = {
    name: "say",
    description: "Start a timed lockdown in a channel",
    category: "moderation",
    usage: "say <message>",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You can not do that!"); 
        const sayMessage = args.join(" ") 
          message.delete()
        message.channel.send(sayMessage) 
    }
}
