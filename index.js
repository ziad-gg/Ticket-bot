const { Ticket } = require('./structure/ticketBot');
const express = require("express");
const app = express();
app.listen(5000);
app.get("/", (req, res) => res.send("hello"))
new Ticket(process.env.TOKEN)
.run();