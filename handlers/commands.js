const {readdirSync} = require('fs');

module.exports = async (client) => {

    for (let folder of readdirSync('commands').filter(folder => !folder.includes('.'))) {
        for (let file of readdirSync('commands/' + folder).filter(f => f.endsWith('.js'))) {
          let command = require(`../commands/${folder}/${file}`);
          command.category = folder;
          client.commands.set(command.name, command);
        }
      } 
}