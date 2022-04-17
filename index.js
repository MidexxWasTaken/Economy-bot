const fs = require('fs');
const db = require ('quick.db')
const Discord = require('discord.js');
const { Client } = require('discord.js');
const { token, prefix } = require ('./config.json');
const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'],
    partials: ['GUILD_MEMBER', 'USER', 'MESSAGE'],
    restGlobalRateLimit: 50,
    retryLimit: 2
});
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);   
	client.commands.set(command.name, command);
}
client.db = db;
client.prefix = prefix;
client.login(token);