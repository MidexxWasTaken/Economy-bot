module.exports = {
	name: 'messageCreate',
	execute(client, message) {
		if (message.author.bot) return;
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
		if (!message.content.startsWith(client.prefix)) return;
		const [cmdName, ...args] = message.content.slice(client.prefix.length).trim().split(/ +/);
		const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
		if (command) {
			console.log(`Attempting to execute Command ${command.name} with args ${args}`);
			command.execute(client, message, args);
		} else {
			message.reply('Command not found.');
			console.log(`Attempting to execute Command ::${cmdName}:: with args [${args}]`);
		}
	}
};