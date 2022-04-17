const { MessageEmbed, MessageButton, MessageActionRow, } = require('discord.js');


module.exports = {
    data: {
        name: 'help',
        type: 1,
        description: 'Open the help menu!'
    },
    async execute(interaction, client, args) {
        //has the interaction already been deferred? If not, defer the reply.
        if (interaction.deferred == false) {
            await interaction.deferReply();
        }
      
      
        const button_1 = new MessageButton()
            .setCustomId('Right')
            .setEmoji("➡️")
            .setLabel('Next')
            .setStyle('SECONDARY');
  
        const button_2 = new MessageButton()
            .setCustomId('Left')
            .setEmoji("⬅️")
            .setLabel('Prev')
            .setStyle('SECONDARY');
  
        const button_3 = new MessageButton()
            .setCustomId('Stop')
            .setEmoji('<a:xmark:963582538104852500>')
            .setLabel('Cancel')
            .setStyle('PRIMARY')

      const button_4 = new MessageButton()
            .setURL('https://www.google.ca/')
            .setLabel('Vote')
            .setStyle('LINK')
  
        const row = new MessageActionRow( {components: [button_4, button_2, button_1, button_3], type: "BUTTON" } );
        let page = 0;
        const pages = [
            new MessageEmbed().setTitle('p1').setDescription('page 1'),
            new MessageEmbed().setTitle('p2').setDescription('page 2'),
            new MessageEmbed().setTitle('p3').setDescription('page 3'),
            new MessageEmbed().setTitle('p4').setDescription('page 4')
        ];
  
  
        const currPage = await message.editReply({ embeds: [pages[page]], components: [row], fetchReply: true });
        // console.log(currPage);
  
        const collector = await currPage.createMessageComponentCollector({
          filter: (message) => (message.isButton() || message.isSelectMenu()) && message.user && message.message.author.id == client.user.id,
          time: 180e3
        });
        //console.log(collector)
        collector.on("collect", async(b) => {
            try {
                if (b.isButton()) {
                    if (b.user.id !== message.user.id)
                        return b.reply({
                            content: "ERROR: You can't interact with this message"
                        });
                    switch(b.customId) {
                        case 'Left':
                        if (page !== 0) {
                            page -= 1;
                            
                        } else {
                            page = pages.length - 1;
                        }
                        break;
                        case 'Right':
                        if (page < pages.length - 1) {
                            page++;  
                        } else {
                            page = 0;
                        }
                        break;
                        case 'Stop':
                        // await b.update({ content: 'Stopped', components: [] })
                        collector.stop()
                        break;
                    }
                    await b.deferUpdate();
                    await b.editReply({
                        embeds: [pages[page]],
                        components: [row]
                    }).catch(e => {})
                    collector.resetTimer();
                }
            } catch (e) {
                console.log(e.stack ? String(e.stack) : String(e))
                console.log(String(e))
            }
        });
        collector.on('end', (_, reason) => {
            if (reason !== 'messageDelete') {
                const disableRow = new MessageActionRow( {components: [button_4.setDisabled(true), button_2.setDisabled(true), button_1.setDisabled(true), button_3.setDisabled(true)], type: "BUTTON" } );
                currPage.edit({
                    embeds: [pages[page]], components: [disableRow]
                });
            }
        });
    }
}