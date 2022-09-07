const {readdirSync} = require('fs');
const events = readdirSync('events');

module.exports = async (client, events) => {

    events.filter(e => e.endsWith('.js')).forEach(event => {
        event = require(`../events/${event}`)(client);
        event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
    });

    events.filter(e => !e.endsWith('.js')).forEach(folder => {
        readdirSync('./events/' + folder).forEach(event => {
          event = require(`../events/${folder}/${event}`)(client);
          event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
        });
    });
}