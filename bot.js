const Discord = require('discord.js');
const client = new Discord.Client()
const ElectryHost = new Discord.Client()

ElectryHost.on(`ready`, () => {
	console.log(`Opgestart, Om dingen te gaan verkopen of mensen te helpen!`)
  });

ElectryHost.on(`ready`, () => {
	console.log(`Opgestart, Om dingen te gaan verkopen of mensen te helpen!`)
    ElectryHost.user.setActivity(`Dingen maken!`)
    setInterval(game, 10000);
    function game() {
        var random = Math.floor((Math.random() * 3) + 1);
        if (random === 1) ElectryHost.user.setActivity(`to ${ElectryHost.guilds.size} servers`, {type: "WATCHING"});
        if (random === 2) ElectryHost.user.setActivity(`${ElectryHost.users.size} spelers`, {type: "LISTENING"});
        if (random === 3) ElectryHost.user.setActivity(`Hosten!`, {type: "WATCHING"});
    }
  });

  ElectryHost.on(`guildMemberAdd`, (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
  });
 
  ElectryHost.on('guildMemberAdd', async member => {
    let guild = member.guild;
    let userclient = member.user.bot ? 'Bot' : 'User'
    let channel = guild.channels.find('name', 'member-log');
    if (!channel) {
        guild.createChannel('new-general', 'text').then(channel => console.log(`Created new channel ${channel}`)).catch(console.error);
    }
    let role = member.guild.roles.find('name', '🌎| Members');
    if (!role) {
        guild.createRole({
            name: '🌎| Members',
            color: 'GRAY_DARK'
        }).then(role => console.log(`Created role ${role}`)).catch(console.error);
    }
    const welcomeEmbed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag} is gejoind!`, member.user.displayAvatarURL)
    .setColor(65280)
    .setTimestamp()
    .setFooter(`New ${userclient}`)
    channel.send(welcomeEmbed);
    await member.addRole(role);
});

ElectryHost.on('guildMemberRemove', async member => {
    let guild = member.guild;
    let userclient = member.user.bot ? 'Bot' : 'User';
    let channel = guild.channels.find('name', 'member-log');
    if (!channel) {
        guild.createChannel('new-general', 'text').then(channel => console.log(`Created new channel ${channel}`)).catch(console.error);
    }
    const byeEmbed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag} is geleaved!`, member.user.displayAvatarURL)
    .setColor(13632027)
    .setTimestamp()
    .setFooter(`${userclient} left`)
    channel.send(byeEmbed);
});

  ElectryHost.on('message', message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(message.content === `.kick`) {
   
        let kUser = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have enough perms for this command");
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.slice(1).join(" ");
        if (!kReason) return message.channel.send("You need to specify why you want to kick this user");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
   
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick info:")
        .setColor([255, 0, 0])
        .addField("Target", `**${kUser}**`)
        .addField("Moderator", `**<@${message.author.id}>**`)
        .addField("Where it happend", message.channel)
        .addField("Reason:", kReason);
   
        let kickChannel = message.guild.channels.find(`name`, "mod-log");
        if(!kickChannel) return message.channel.reply("Can't find mod-log channel.");
   
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
   
        return;
    }  
      
if(message.content.startsWith(".count")){
    let roleName = message.content.split(" ").slice(1).join(" ");

    //Filtering the guild members only keeping those with the role
    //Then mapping the filtered array to their usernames
    let membersWithRole = message.guild.members.filter(member => { 
        return member.roles.find("name", "🌎| Members");
    }).map(member => {
        return member.user.username;
    })

    let embed = new Discord.RichEmbed({
        "title": `Users with the ${roleName} role`,
        "description": membersWithRole.join("\n"),
        "color": 0xFFFF
    });

    return message.channel.send({embed});
}
      
	if(message.content === `.status`) {
		ElectryHost.user.setStatus()
	}
      
    if(message.content === `.invite`) {
        message.channel.send('**Wat leuk dat je onze bot leuk vind! Hopelijk ga je veel plezier ermee hebben, https://discordapp.com/oauth2/authorize?client_id=427857462947872779&scope=bot&permissions=8**')
    }
	
    if(message.content === `.prijs`) {

        const Prijs1Embed = new Discord.RichEmbed()
        .setTitle(`Kortingen en Gratis toevoegingen.`)
        .addField('10$ Korting.', `Je krijgt 10% korting op een server van 3GB voor 3 maanden.`)
        .addField('Gratis .NL domein.', `Je krijgt op aanvraag van gratis .nl domein bij aankoop van minimaal 2GB server voor 6 maanden.`)
        .setColor('0x4628d0')
        console.log('PRIJS: KORTINGEN EN GRATIS TOEVOEGINGEN')
        message.channel.send(Prijs1Embed)
    }
      
    if(message.content === `.prijs`) {

        const Prijs2Embed = new Discord.RichEmbed()
        .setTitle(`Toevoegingen.`)
        .addField('Database.', `Bij aankoop van een server krijg je een gratis MySQL database op aanvraag.`)
        .addField('Gratis .NL domein.', `Je krijgt op aanvraag van gratis .nl domein bij aankoop van minimaal 2GB server voor 6 maanden.`)
        console.log('PRIJS: TOEVOEGINGEN')
        message.channel.send(Prijs2Embed)
    }
      
    if(message.content === `.prijs`) {

        const Prijs3Embed = new Discord.RichEmbed()
        .setTitle(`Installatie support.`)
        .addField('Minetopia', `Bij aankoop van een 2GB (Minimaal) krijg je gratis Minetopia server installatie support.`)
        .addField('Skyblock', `Bij aankoop van een 2GB (Minimaal) krijg je gratis Skyblock server installatie support.`)
        .addField('Factions', `Bij aankoop van een 2GB (Minimaal) krijg je gratis Factions server installatie support.`)
        .addField('Modpacks', `Bij aankoop van een 2GB (Minimaal) krijg je gratis Modpacks installatie op aanvraag.`)
        .setColor('0x4628d0')
        console.log('PRIJS: INSTALLATIE SUPPORT')
        message.channel.send(Prijs3Embed)
    }
      
    if(message.content === `.prijs`) {

        const Prijs4Embed = new Discord.RichEmbed()
        .setTitle(`Overstap support.`)
        .addField('**Overstappen van andere host naar ons**')
        .addField('`Op aanvraag helpen wij je overstappen van je oude host om alle bestanden veilig over te brengen.`')
        .setColor('0x4628d0')
        console.log('PRIJS: OVERSTAP SUPPORT')
        message.channel.send(Prijs4Embed)
    }
      
    if(message.content === `.prijs1`) {

        const PrijsVPSEmbed = new Discord.RichEmbed()
        .setTitle(`☁ Cloud VPS`)
        .setDescription('Wij kunnen nog geen Cloud VPSen voor u kunnen hosten en verkopen!')
        .setColor('0x4628d0')
        console.log('PRIJS: VPS')
        message.channel.send(PrijsVPSEmbed)
    }

    if(message.content === `.prijs1`) {

        const PrijsHostingEmbed = new Discord.RichEmbed()
        .setTitle(`Web Hostings`)
        .setDescription('Wij kunnen nog geen Web Hostings voor u kunnen hosten en verkopen!')
        .setColor('0xffffff')
        console.log('PRIJS: HOSTING')
        message.channel.send(PrijsHostingEmbed)
    }

    if(message.content === `.prijs1`) {

        const PrijsDiscordEmbed = new Discord.RichEmbed()
        .setTitle(`Discord Bots`)
        .addField('712 MB RAM [1 CPU]', `Vanaf 1,00 per maand.`)
        .addField(`1021 MB RAM [2 CPU\n'\ns]`, `Vanaf 2,00 per maand.`)
        .addField(`2021 MB RAM [3 CPU\n'\ns]`, `Vanaf 3,00 per maand.`)
        .setColor('0x9b28e8')
        console.log('PRIJS: DISCORD')
        message.channel.send(PrijsDiscordEmbed)
    }

    if(message.content === `.prijs1`) {

        const PrijsDomeinEmbed = new Discord.RichEmbed()
        .setTitle(`Domeinen`)
        .addField('.nl', `Vanaf 3,00 per jaar.`)
        .addField('.be', `Vanaf 3,00 per jaar.`)
        .addField('.de', `Vanaf 3,00 per jaar.`)
        .addField('.fr', `Vanaf 6,00 per jaar.`)
        .addField('.eu', `Vanaf 2,50 per jaar.`)
        .addField('.co.uk', `Vanaf 6,00 per jaar.`)
        .addField('.net', `Vanaf 10,00 per jaar.`)
        .addField('.org', `Vanaf 10,50 per jaar.`)
        .addField('.it', `Vanaf 2,50 per jaar.`)
        .setColor('0x9b28e8')
        console.log('PRIJS: DISCORD')
        message.channel.send(PrijsDomeinEmbed)
    }
      
    if(message.content === `.prijs1`) {

        const PrijsVPSEmbed = new Discord.RichEmbed()
        .setTitle(`Minecraft Servers`)
        .addField('.nl', `Vanaf 3,00 per jaar.`)
        .addField('.be', `Vanaf 3,00 per jaar.`)
        .addField('.de', `Vanaf 3,00 per jaar.`)
        .addField('.fr', `Vanaf 6,00 per jaar.`)
        .addField('.eu', `Vanaf 2,50 per jaar.`)
        .addField('.co.uk', `Vanaf 6,00 per jaar.`)
        .addField('.net', `Vanaf 10,00 per jaar.`)
        .addField('.org', `Vanaf 10,50 per jaar.`)
        .addField('.it', `Vanaf 2,50 per jaar.`)
        .setColor('0x4628d0')
        console.log('PRIJS: VPS')
        message.channel.send(PrijsMinecraftEmbed)
    }
      
    if(message.content === `.ban`) {
 
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have enough perms for this command");
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

        let banEmbed = new Discord.RichEmbed()
        .setTitle(`${message.author.id} ElectryHost - Ban.`)
        .setDescription("Oef.. Wie is stout geweest met Sinterklaas?")
        .setColor([255, 0, 0])
        .addField("**Uitvoerder**", `**${bUser}**`)
        .addField("**Doelwit**", `**<@${message.author.id}>**`)
        .addField("**Reden**", message.channel)
        .addField("**Actie**:", bReason);

        let banchannel = message.guild.channels.find(`name`, "mod-log");
        if(!banchannel) return message.channel.reply("Can't find mod-log channel.");

        message.guild.member(bUser).ban(bReason);
        banchannel.send(banEmbed);


        return;
    }
 
 var fortunes = [
    "I have no battery more! :sadfile:",
    "My battery is now 100%",
    "My battery is now 50%",
    "My battery is now 25%",
    "My battery is now 12%",
    "My battery is now 1%",
    "My battery is now 10%",
    "My battery is now 30%",
    "My battery is now 15%",
    "My battery is now 99%",
    "My battery is now 75%",
    "My battery is now 90%",
    "My battery is now 67%"
];
 
if(message.content === `.battery`) {
    if (args[0]) message.channel.send({embed: {
        color: 12629277,
        description: fortunes[Math.floor(Math.random() * fortunes.length)]
      }});
    else message.channel.send("Gambling a percentage what you think my battery is!");
    }

if(message.content === `.reload`) {
    loadCmds();
    }
      
if(message.content.startsWith(".promotie")){
    message.delete(1);
    const member = message.member;
    const PromotieEmbed = new Discord.RichEmbed()
    .setTitle(`Promotie`)
    .addField('Gebruiker:', `<@${message.author.id}>`)
    .addField('Doorgever:', `GalaxyHost#2382`)
    .addField('Server:', 'https://discord.gg/sGEQq5E')
    .setThumbnail(message.author.displayAvatarURL)
    .setColor('0x4628d0')
    console.log('PROMO: ELECTRYHOST!')
    message.channel.send(PromotieEmbed)
}

if(message.content == ".help") {
    let embed = new Discord.RichEmbed()
    .setAuthor("ElectryHost - Commands", '')
    .addBlankField(true)
    .addField('Moderation', '\n  \n.ban | Bans a member \n.kick | Kicks a member \n**SOON** \n.purge <ammount> | Cleans up the ammount of messages u have chosen.')
    .addBlankField(true)
    .addField('More?', '\n \nshit | :smile:')
    .setThumbnail("https://cdn.discordapp.com/avatars/421690922091282434/6ae7cded7cb1b3b479b2f9ac9ec92411.png")
    .setColor([192, 181, 29])
     message.channel.send(embed)
    }

if (message.content == ".about") {
    let embed = new Discord.RichEmbed()
    .addField('Who am i?', 'I am ElectryHost, and I will try my best to help everyone! If I am in a discord server, people can use me to moderate their server and to have fun!. See all my commands by sending **_!help_**')
    .addField('My Statistics', `Im on **${ElectryHost.guilds.size}** servers, \nand **${ElectryHost.users.size}** users`)
    .addField('My ID is:', message.author.id)
    .addField('My invite link is:', `http://bit.ly/ElectryHostBot`)
    .addBlankField(true)
    .addField('NOTE: Some commands may not work and the reason for that is because it is in ***BETA***!', 'b0.0.1 (BETA)')
    .setThumbnail("https://cdn.discordapp.com/avatars/421690922091282434/6ae7cded7cb1b3b479b2f9ac9ec92411.png")
    .setColor([192, 181, 29])
     message.channel.send(embed)
    }
	
if(message.content === "!purge") {
	let messagecount = parseInt(numberofmessages);
	message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    }

if(message.content == ".test") {
    let embed = new Discord.RichEmbed()
    .setAuthor("ElectryHost - Private Mode", '')
    .addBlankField(true)
    .addField('**Enabled!**', '\n  \nThis server has activated Private mode. \nThis command can be enabled by the author or the owner of the discord that bought Private mode on: **SOON**')
    .setThumbnail("https://cdn.discordapp.com/avatars/421690922091282434/6ae7cded7cb1b3b479b2f9ac9ec92411.png")
    .setColor([192, 181, 29])
     message.channel.send(embed)
     console.log('Private mode has been enabled by a author!')
    }

if(message.content.startsWith("||say ")) {
    message.delete(1000); //Supposed to delete message
    message.channel.send(message.content.slice(5, message.content.length));
   }
      
if(message.content == ".nieuws1") {
    message.delete(1);
    const nieuwsembed = new Discord.RichEmbed()
    .setTitle('Informatie:')
    .setDescription(':tools: Onze bot is tijdelijk in **ONDERHOUD** en we zullen wel de bot aan laten staan maar wij willen dan dat u en zowel staff niet aan de bot gaat zitten spelen wij willen daarbij verkomen dat de bot niet crasht en wij zorgen tegelijke tijd ervoor dat de bot `24/7` wordt! :tools:')
    .setColor(0x3f03a3)
    .setTimestamp()
    message.channel.send(nieuwsembed)
}
      
if(message.content == ".nieuws") {
    message.delete(1);
    const nieuwsembed = new Discord.RichEmbed()
    .setTitle('Informatie:')
    .setDescription('Vandaag hebben wij onze **INSTAGRAM** account online gezet! dus wil jij nou onze **INSTAGRAM** account checken? Ga dan snel naar https://www.instagram.com/electryhost.nl/ **de naam is electryhost.nl en dat komt omdat wij daar onze site willen heen gaan doen.. dus wil je ons sponseren? dat kan via https://.paypal.me/SmikkelHost en je krijgt er een donator + klant rank erbij!')
    .setColor(0x3f03a3)
    .setTimestamp()
    message.channel.send(nieuwsembed)
}
      
if(message.content == ".kill") {
    let killembed = new Discord.RichEmbed()
    .setTitle('Killed ElectryHosting')
    .addField('KILLED:', 'ElectryHost#2382')
    .addField('MURDER:', ':question:')
    .setColor(0xce0000)
    message.channel.send(killembed)
    ElectryHost.destroy()
    console.log('Pff.. Ik ben weer eens dood gemaakt door iemand.. BEL IS 112!!!!!')
    }
});
client.login(process.env.TOKEN)
