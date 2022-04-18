const db = require ('quick.db')
module.exports = {
    name: 'test',
    async execute (client, message, args) {
        channel.message.send(await db.get(`${guild.id}_${member.id}_wallet`));
    }
}
