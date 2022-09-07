const { presence } = require('../src/config');
const {refreshTickets} = require('../src/util');
module.exports = (client) => ({
  name: 'ready',
  once: true,
  async execute() {
    
    client.user.setPresence(presence);
    client.loger.log(`${client.user.tag} Is Online !`)
    setUp(client);
    
    function setUp(client) {
      require('../handlers/collector')(client)
    }

    setInterval(() => {
      setUp(client);
    }, 1000)
    
  }
});