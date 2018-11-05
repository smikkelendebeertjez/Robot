const Discord = require('discord.js');
const client = new Discord.Client()

client.on(`ready`, () => {
	console.log(`Opgestart!`)
    ElectryHost.user.setActivity(`Opgestart!`)
    setInterval(game, 10000);
    function game() {
        var random = Math.floor((Math.random() * 3) + 1);
        if (random === 1) client.user.setActivity(`to ${ElectryHost.guilds.size} servers`, {type: "WATCHING"});
        if (random === 2) client.user.setActivity(`${ElectryHost.users.size} spelers`, {type: "LISTENING"});
    }
  });

client.login(process.env.TOKEN)
