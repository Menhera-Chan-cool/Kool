const Discord = require('discord.js')
const r = "RANDOM";

module.exports = {
    name: "kick",
    category: "moderation",
    description: "kick a member",
    usage: "-kick <user>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`You don't have permission to kick members.`);
        let toKick = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.channel.send(` Please specify someone to ban.`);
        if(!toKick) return message.channel.send(`${args[0]} is not a member.`);
        if(!reason) return message.channel.send(` Specify a reason.`);
 
        if(!toKick.kickable){
            return message.channel.send(':x: I cannot kick someone that is mod/admin. :x:');
        }
 
        if(toKick.kickable){
            let x = new Discord.MessageEmbed()
            .setTitle('Kick')
            .addField('Member Kicked', toKick)
            .addField('Kicked by', message.author)
            .addField('Reason', reason)
            .addField('Date', message.createdAt)
            .setColor(r);
 
            message.channel.send(x);
            toKick.kick();
        }

   
    }
}

