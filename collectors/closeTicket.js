const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "close_ticket",
  cooldown: true,
  async execute(i, client) {
    await i.deferUpdate();

    let embed = new MessageEmbed().setColor(client.embedColor).setDescription(`**do you want to close the ticket. !**`);
    if (!i.channel) return

    const row1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('close_now')
          .setLabel(`close ${i.channel.name}`)
          .setStyle('DANGER')
          .setEmoji('🔒'),
      );

    i.channel.send({ embeds: [embed], components: [row1] });
  }
}

