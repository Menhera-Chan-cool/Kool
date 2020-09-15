module.exports = {
    name: "addrole",
    category: "moderation",
    description: "add role to a member",
    usage: "-addrole <user> <role>",
    run: async (client, message, arguments) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission to give role to members.");
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
          message.reply('Please specify someone to give a role to.')
          return
        }
    
        arguments.shift()
    
        const roleName = arguments.join(' ')
        const { guild } = message
    
        const role = guild.roles.cache.find((role) => {
          return role.name === roleName
        })
        if (!role) {
          message.reply(`There is no role with the name "${roleName}"`)
          return
        }
    
        const member = guild.members.cache.get(targetUser.id)
        member.roles.add(role)
    
        message.reply(`that user now has the "${roleName}" role`)
    }
}