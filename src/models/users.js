const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  guildId: {type: String,required: true,},
  panalId: {type: String},
  userId: {type: String},
  tickets: [],
});

userSchema.statics.findUser = async function(guildId, panalId, userId) {
    const data = await this.findOne({
    guildId,
    panalId,
    userId
   });
  return data
}

userSchema.statics.setUser = async function(guildId, panalId, userId, newTicket) {
  const oldData = await this.findOne({
    guildId,
    panalId,
    userId
  });
  
  if (oldData) {
    oldData.tickets.push(newTicket);
    oldData.save();
  }
  if (!oldData) {
    await this.create({ 
    guildId,
    panalId,
    userId
    });
    const newData = await this.findOne({
    guildId,
    panalId,
    userId
    });
    newData.tickets.push(newTicket);
    newData.save();
    
  }
  
}

const Users = mongoose.model("Users", userSchema);

module.exports = Users;