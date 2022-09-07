const { MessageEmbed } = require('discord.js');
const { messageObject } = require('../../src/util');

module.exports = {
    name: "add",
    usages: ["add (user)"],
    examples: ['add {userMention}', 'add {userId}'],
    args: true,
    cooldown: 10,
    permissions: {
      bot: ['ADMINISTRATOR'],
      users: ['MANAGE_GUILD'],
    },
  async execute(message, args, client) {
    
    let embed = new MessageEmbed().setColor(client.embedColor);
    const user = await message.guild.members.fetch({ user: args[0].toDiscordId()}).then(async user => {
    message.channel.permissionOverwrites.edit(user.id, { "SEND_MESSAGES": true, 'VIEW_CHANNEL': true });
    embed.setDescription(`> **done add <@${user.id}> to <#${message.channel.id}>**`);
    message.reply(messageObject({embed})).catch(e => {console.log(e)});
    }).catch(e => {
      message.reply(messageObject({content: `> **i cant find this user !**`}))
    })

    
  }
}