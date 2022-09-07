const guilds = require('../src/models/guilds');
const panals = require('../src/models/panals');
const users = require('../src/models/users');
const {MessageEmbed, MessageActionRow, MessageButton, Collection} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "open",
    cooldown: true,
    setup: async (i, client) => {

           const data = await panals.findOne({
             guildId: i.guild.id,
             channelId: i.channel.id
           });
      
           var userData = await users.findOne({
             guildId: i.guild.id,
             panalId: i.channel.id,
             userId: i.user.id,
           });

         if (!data) return await i.channel.send({content: `> **please choose panal for this channel**`}).then(async m => {
          await wait(5000);
          m.delete();
        });

      if (userData && userData.tickets.length) {
        userData.tickets.forEach(async ticket => {
          const ticketChannel= await i.guild.channels.cache.get(ticket);
          if (!ticketChannel) {
            let channelIndex = [-userData.tickets.indexOf(ticket)];
            userData.tickets.splice(channelIndex[0]);
            userData.save();
            userData.tickets = userData.tickets.splice(channelIndex[0]);
          };      
        });
            if (userData.tickets.length >= data.limit) {
             return i.reply({content: `> **you can open only \`${data.limit}\` tickets**`, ephemeral: true });
          };
      };

      
        let embed1 = new MessageEmbed()
        .setColor("RED")
        .setTitle(data.inchannelMesage.EmbedTitle)
        .setDescription(data.inchannelMesage.EmbedDescription)
        .setFooter({text: `Powered by ziad`})
      
        const row = new MessageActionRow()
        .addComponents(
         new MessageButton()
          .setCustomId(`close_ticket-${i.user.id}-${i.channel.id}`)
          .setLabel(data.inchannelMesage.closeButtonMessage)
          .setStyle('DANGER')
          .setEmoji('🔒'),
      
          new MessageButton()
          .setCustomId('closeWithReason')
          .setLabel('close With Reason')
          .setStyle('DANGER')
          .setEmoji('🔒')
          .setDisabled(false),
        );
        
      const catgory = await i.guild.channels.cache.get(data.categoryId);
     i.channel.openBy = i.user.id
         
        await i.guild.channels.create( `ticket-${data.count}` ,
            {
              parent: catgory.id, 
              type: "text",
              permissionOverwrites: [
               {id: i.guild.roles.everyone, deny: [ 'SEND_MESSAGES','VIEW_CHANNEL'] },
               {id: i.user.id,allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']}
              ],
            })
        .then(async channel => {
          data.count += 1;
          data.openTickets.push(channel.id);
          data.save();

      data.supportTeamRoles.forEach(async role => {
        const support = await i.guild.roles.cache.get(role);
        if (support) {
        channel.permissionOverwrites.create(support, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true
          })
        }
      })
     
        users.setUser(i.guild.id, i.channel.id, i.user.id, channel.id);
        await channel.send({content: `<@${i.user.id}>`, embeds: [embed1], components: [row]}).catch(e => {console.log(e)});
   
         let messageTicketCreate = new MessageEmbed()
         .setColor(client.embedColor)
         .setTitle(`Ticket`)
         .setDescription(`Opened a new ticket: <#${channel.id}>`)
         .setThumbnail(client.user.avatarURL({ dynamic: true }))
         .setFooter({text: `Powered by ziad`, iconUrl: client.user.avatarURL({ dynamic: true }) });
         
         await i.reply({embeds: [messageTicketCreate], ephemeral: true}).catch(e => {})


        }).catch(e => {
          console.log(e);
        }) // then
       

      
  
   }
}