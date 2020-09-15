const default_prefix = require('../../config.json')

module.exports = {
    name: "slowmode",
    category: "moderation",
    description: "Set the slowmode for the channel!",
    usage: "-slowmode <time>",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.channel.send("You don't have access to this command!");
     
       
       if (!args[0])
        return message.channel.send('You did not specify a correct amount of time!');
       if (isNaN(args[0])) return message.channel.send('That is not a number!');
     
      
       const validNumbers = [
       
        5,
      
        10,

        15,
        
        30,
       
        60,

        120,

        300,

        600,

        900,

        1800,

        3600,

        7200,

        21600,
        
       ];
     
      
       if (!validNumbers.includes(parseInt(args[0])))
        return message.channel.send('Invalid Number! Number must be below 21600.');
     

       message.channel.setRateLimitPerUser(args[0]);
     

       message.channel.send(`Slowmode Set to **${args[0]}**`);
      
    },
};