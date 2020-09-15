const {
  token,
  default_prefix
} = require("./config.json");
const {
  config
} = require("dotenv");
const { Client, discord, Collection, MessageAttachment, MessageEmbed } = require("discord.js"); 
const client = new Client();
const db = require("quick.db");
const m = require('moment-duration-format') 
const  fetch = require('node-fetch')
const {
  addexp
} = require("./handlers/xp.js");
client.commands = new Collection();
client.aliases = new Collection();

const {
  CanvasSenpai
} = require("canvas-senpai")
const canva = new CanvasSenpai();


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const activities_list = [
  "with the $help command.", 
  "with Khanh",
  "with Roblox", 
  "Jojo\'s Bizarre Adventure"
  ]; 
client.on('ready', () => {
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index]); 
  }, 1000000);
  console.log('Im ready To Do Work!') 
});

client.on("message", async message => {
  if (message.author.bot) return;

  let afk = new db.table("AFKs"),
authorStatus = await afk.fetch(message.author.id),
mentioned = message.mentions.members.first();

if (mentioned) {
let status = await afk.fetch(mentioned.id);

if (status) {
const embed = new MessageEmbed()
.setColor(0xffffff)
.setDescription(`This user (${mentioned.user.tag}) is AFK: **${status}**`)
message.channel.send(embed).then(i => i.delete({timeout: 5000}));
}
}

if (authorStatus) {
const embed = new MessageEmbed()
.setColor(0xffffff)
.setDescription(`**${message.author.tag}** is no longer AFK.`)
message.channel.send(embed).then(i => i.delete({timeout: 5000}));
afk.delete(message.author.id)
}

  let blacklist = await db.fetch(`blacklist_${message.author.id}`)

  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (blacklist === "Blacklisted") return message.reply("You are blacklisted from the bot!")

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }


  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));




  if (command) command.run(client, message, args);

  return addexp(message);
}); 



client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }


  let data = await canva.welcome(member, {
    link: "https://coverfiles.alphacoders.com/111/111206.png",
    blur: true
  })

  const attachment = new MessageAttachment(
    data,
    "welcome-image.png"
  );




  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);

});


client.login(process.env.token);
