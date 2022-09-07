const mongoose = require('mongoose');

const panalsSchema = new mongoose.Schema({
  guildId: { type: String },
  channelId: { type: String },
  categoryId: { type: String},
  limit: { type: Number },
  twoStepClose: { type: Boolean },
  ticketname: { type: String },
  supportTeamRoles: [],
  openTickets: [],
  count: {type: Number},
  outEmbed: {
    EmbedTitle: { type: String },
    EmbedDescription: { type: String },
    buttonMessage: { type: String },
    buttonIcon: { type: String},
  },
 inchannelMesage: {
    EmbedTitle: { type: String },
    EmbedDescription: { type: String },
    closeButtonMessage: { type: String },
 } 
});

const Panals = mongoose.model("Panals", panalsSchema);

module.exports = Panals;