const { MessageEmbed } = require('discord.js');
const { messageObject } = require('../../src/util');

module.exports = {
  name: 'help',
  usages: ['help', 'help (Command)'],
  examples: ['help', 'help ping'],
  cooldowns: 20,
  help: false,
  async execute (message, args, client) {
    
    const replys = client.cmdReplys;
    
    let embed = new MessageEmbed()
    .setFooter({text: replys.ghFooter(client.prefix)})
    .setColor(client.embedColor);
    
    if (args[0] && args[0].toLowerCase() != 'help') {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));
      if (!command || command.help == false || command.category == "dev") return message.reply(replys.chNotFound);
      const cmdInfo = client.languageJson[command.name.toLowerCase()].info || command;
      
      embed.setTitle(replys.chTitle(command.name)); 
      embed.setFooter({text: replys.chFooter});
      
      if (cmdInfo.description) embed.setDescription(cmdInfo.description);
      if (command.aliases || cmdInfo.aliases) embed.addField(replys.chSections[0], [].concat((command.aliases || []), (cmdInfo.aliases || [])).map(e => `${client.prefix}${e}`).join('\n'));
      if (command.usages) embed.addField(replys.chSections[1], command.usages.map(e => `${client.prefix}${e}`).join(`\n`));
      if (command.examples) embed.addField(replys.chSections[2], command.examples.map(e => `${client.prefix}${e.replace(/\{userMention}/g, `<@${message.author.id}>`).replace(/\{userId}/g, `${message.author.id}`)}`).join(`\n`));
      //embed.addField(`**Cooldown:**`, `${(command.cooldown) ? command.cooldown : 3} second(s)`);;
        
    } else {
      let commands = [];
      
      client.commands.filter(e => e.category != 'dev' && (e.help || e.help == undefined)).forEach(cmd => {
        commands.push({ name: `\`${client.prefix}${cmd.name}\``, category: cmd.category });
      });
      
      let general = commands.filter(cmd => cmd.category == 'general').map(cmd => cmd.name);
      let ticket = commands.filter(cmd => cmd.category == 'ticket').map(cmd => cmd.name);
      
      embed.setTitle(replys.ghTitle);
      embed.setDescription(` [dashboard](https://ticket.gup-gungun.repl.co/) `)
      if (general.length) embed.addField(replys.ghSections[0], general.join(', '));
      if (ticket.length) embed.addField(replys.ghSections[1], ticket.join(', '));
    }
    message.reply(messageObject({ embed }));
  }
}