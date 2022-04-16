const db = require ('quick-db')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.guilds.cache.map(async guild => {
			guild.members.cache.map(async member => {
				if (await db.fetch(`${guild.id}_${member.id}_wallet`) === null) {
					console.log('No wallet found for ' + member.user.tag);
					console.log("Creating wallet for " + member.user.tag);
					await db.set(`${guild.id}_${member.id}_wallet`, 0);
				}
			});
		})
	}
};