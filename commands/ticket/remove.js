const { MessageEmbed } = require('discord.js');
const { messageObject } = require('../../src/util');

module.exports = {
    name: "remove",
    usages: ["remove (user)"],
    examples: ['remove {userMention}', 'remove {userId}'],
    args: true,
    cooldown: 3,
    permissions: {
      bot: ['ADMINISTRATOR'],
      users: ['ADMINISTRATOR'],
    },
  async execute(message, args, client) {
    
    let embed = new MessageEmbed().setColor(client.embedColor);
    const user = await message.guild.members.fetch({ user: args[0].toDiscordId()}).then(async user => {
    message.channel.permissionOverwrites.edit(user.id, { "SEND_MESSAGES": false, 'VIEW_CHANNEL': false });
    embed.setDescription(`> **done remove <@${user.id}> from <#${message.channel.id}>**`);
    message.reply(messageObject({embed})).catch(e => {console.log(e)});
    }).catch(e => {
      message.reply(messageObject({content: `> **i cant find this user !**`}))
    })

    
  }
}