const panals = require('../src/models/panals');
const users = require('../src/models/users');

module.exports = (client) => ({
  name: 'channelDelete',
  async execute(channel) {
    
   if (channel.type !== "GUILD_TEXT") return;
    
      var allData = await panals.find();
      allData = allData.find(data => data.openTickets.includes(channel.id) );
      if (!allData) return;
       const data = await panals.findOne({
         guildId: channel.guild.id,
         channelId: allData.channelId,   
       });
      var allUserData = await users.find();
      allUserData = allUserData.find(data => data.tickets.includes(channel.id));
      const user = await users.findOne({
        guildId: allUserData.guildId,
        panalId: allUserData.panalId,
        userId: allUserData.userId
      });
      let channelIndex = [-user.tickets.indexOf(channel.id)];
    
       data.openTickets.splice(channelIndex[0]);
       data.save();
      user.tickets.splice(channelIndex[0]);
      user.save();
    
  }
}) 