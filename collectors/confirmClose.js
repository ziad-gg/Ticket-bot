module.exports = {
    name: "close_now",
    async execute(i) {   
      await i.deferUpdate();
      return i.channel.delete();
    }
};