module.exports = {
    name: "hasrole",
    description: "check the member if have role ",
    category: "moderation",
    usage: "-hasrole <user> <role>",
    async run (client, message, arguments){
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission to check role members.");
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
  
      if (member.roles.cache.get(role.id)) {
        message.reply(`That user has the ${roleName} role`)
      } else {
        message.reply(`That user does not have the ${roleName} role`)
      }
    },
  }