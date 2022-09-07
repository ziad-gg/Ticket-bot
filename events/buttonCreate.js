const { Collection } = require('discord.js');
const delay = new Collection();
const ms = require("ms")

module.exports = (client) => ({
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
      
      if (!interaction.isButton()) return;
      client.collectors.get(interaction.customId)? client.collectors.get(interaction.customId).execute(interaction, client) : console.log("hello")
    }
  });