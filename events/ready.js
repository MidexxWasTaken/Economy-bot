module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.guilds.cache.map(async guild => {
			guild.members.cache.map(async member => {
				if (member.user.bot) return;
				if (await client.db.fetch(`${guild.id}_${member.id}_wallet`) === null) {
					console.log('No wallet found for ' + member.user.tag);
					console.log("Creating wallet for " + member.user.tag);
					await client.db.set(`${guild.id}_${member.id}_wallet`, 0);
				}
			});
		})
	}
};