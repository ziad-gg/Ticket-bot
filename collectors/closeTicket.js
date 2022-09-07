const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: "close_ticket",
    cooldown: true,
    setup: async (i, client) => {
        await i.deferUpdate().catch(e => {})
        let embed = new MessageEmbed().setColor(client.embedColor).setDescription(`**do you want to close the ticket. !**`);
        if (!i.channel) return

      const userId = i.customId.slice(13)
      
        const row1 = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('close_now' + "-" + userId)
          .setLabel(`close ${i.channel.name}`)
          .setStyle('DANGER')
          .setEmoji('🔒'),
        );

        i.channel.send({embeds: [embed], components: [row1]});
   }
} 

// ك
