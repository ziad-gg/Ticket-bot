const { Ticket } = require('./structure/ticketBot');
const express = require("express");
const app = express();
app.listen(process.env.PORT || 80);
app.get("/", (req, res) => res.send("hello"))
new Ticket(process.env.TOKEN)
.run();