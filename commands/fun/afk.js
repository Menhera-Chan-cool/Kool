


const m = require('moment-duration-format') 
const  fetch = require('node-fetch')
const db = require('quick.db');
const Discord = require('discord.js')


module.exports = {
    name: "afk",
    description: "when u busy , use afk command",
    category: "fun",
    usage: "-afk <reason> (you can time -afk with no reason , its still work)",
    async run (client, message, args){

        const status = new db.table("AFKs");
        let afk = await status.fetch(message.author.id);
        const embed = new Discord.MessageEmbed().setColor(0xffffff)
        
        if (!afk) {
          embed.setDescription(`**${message.author.tag}** now AFK.`)
          embed.setFooter(`Reason: ${args.join(" ") ? args.join(" ") : "AFK"}`)
          status.set(message.author.id, args.join(" ") || `AFK`);
        } else {
          embed.setDescription("You are no longer AFK.");
          status.delete(message.author.id);
        }
        
        message.channel.send(embed)
      }
     

          
}
