const { embedColor, db } = require('../src/config');
const { Client, Collection } = require('discord.js');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const events = readdirSync('events');
const loger = require('../structure/logger');


require('../src/util');
class Ticket {
    
    constructor(token) {
        this.Token = token;
        this.Client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
    }

    run() {
        this.Client.loger = new loger("logs.log");
        this.Client.login(this.Token);
        this.Client.commands = new Collection();
        this.Client.languages = (readdirSync('./src/languages')).map(e => e.split('.')[0]);
        this.Client.embedColor = embedColor;
        mongoose.connect(db);

        for (let file of (readdirSync('handlers').filter(file => file.endsWith('.js')))) {
            if (!file.startsWith('collector')) require(`../handlers/${file}`)(this.Client, events);
        };
    }
}

module.exports.Ticket = Ticket ; 