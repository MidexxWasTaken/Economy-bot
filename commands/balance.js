const db = require ('quick.db')
module.exports = {
    name: 'balance',
    async execute (client, message, args) {
        const { guild, member } = message;
        const balance = await db.get(`${guild.id}_${member.id}_wallet`);
        message.channel.send({ content: `You have $${balance} in your wallet!` });
    }
}
