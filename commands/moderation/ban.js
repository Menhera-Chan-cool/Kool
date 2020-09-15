const Discord = require('discord.js')
const r = "RANDOM";

module.exports = {
    name: "ban",
    category: "moderation",
    description: "ban a member",
    usage: "-ban <user>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to ban members.");
        let toBan = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.channel.send('Please mention someone to ban');
        if(!toBan) return message.channel.send(`${args[0]} is not a member.`);
        if(!reason) return message.channel.send('Specify a reason.');
 
        if(!toBan.bannable){
            return message.channel.send(':x: I cannot ban someone that is mod/admin. :x:');
        }
 
        if(toBan.bannable){
            let x = new Discord.MessageEmbed()
            .setTitle('Ban')
            .addField('Member Banned', toBan)
            .addField('Banned by', message.author)
            .addField('Reason', reason)
            .addField('Date', message.createdAt)
            .setColor(r);
 
            message.channel.send(x);
            toBan.ban();
        }

}
}
