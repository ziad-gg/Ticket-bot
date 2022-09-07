const mongoose = require('mongoose');

const guildsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  language: String,
  prefix: String,
});

const Guilds = mongoose.model("Guilds", guildsSchema);

module.exports = Guilds;