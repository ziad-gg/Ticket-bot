const {readdirSync} = require('fs');
const {Collection} = require('discord.js');
const delay = new Collection();
const ms = require("ms")

module.exports = async (client) => {
    for (let fileClass of readdirSync('collectors').filter(file => file.endsWith('.js'))) {
       const file =  require(`../collectors/${fileClass}`);
         client.channels.cache.forEach(channel => {            
            const filter = i => i.customId.includes(file.name); 
            if (channel.type === 'GUILD_TEXT')  {
            var collector = channel.createMessageComponentCollector({ filter, time: 1000 });
            collector.on('collect', async(i) => {
                     
              if (file.cooldown) {
      
                    if (delay.has(`${i.customId}-${i.user.id}`)) {
return i.reply({content: `You can use this again after **${ms(delay.get(`${i.customId}-${i.user.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${i.customId}-${i.user.id}`) - Date.now(), { long: true })}**`, ephemeral: true});
  }
            file.setup(i, client);
            delay.set(`${i.customId}-${i.user.id}`, Date.now() + 15000);
                    setTimeout(() => {
                        delay.delete(`${i.customId}-${i.user.id}`);
                    }, 15000);
              }
              else  file.setup(i, client);
            });
           };

         })
         
    }
}