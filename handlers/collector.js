const { readdirSync } = require('fs');

module.exports = async (client) => {
    for (let fileClass of readdirSync('collectors').filter(file => file.endsWith('.js'))) {
       const file =  require(`../collectors/${fileClass}`);
       client.collectors.set(file.name, file)       
    }
}