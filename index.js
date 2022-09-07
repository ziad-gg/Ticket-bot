const { Ticket } = require('./structure/ticketBot');

new Ticket(process.env.TOKEN)
.run();