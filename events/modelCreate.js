
module.exports = (client) => ({
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
      if (!interaction.isModalSubmit()) return;
      
       if (interaction.customId === 'myModal') {
          await interaction.reply("good bye")
              await interaction.channel.delete();
        }
    }
  });