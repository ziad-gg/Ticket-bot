module.exports = {
    name: "close_now",
    setup: async (i) => {
      
      return i.channel.delete();
      
    }
};