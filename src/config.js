const prefix = "-";

module.exports = {
  prefix,
  language: 'en',
  owners: ["806426044747350017"],
  embedColor: `BLUE`,
  "presence": {
    "status": `online`,
    "activities": [{
      "type": `PLAYING`,
      "name": `${prefix}help`
    }]
  },
  db: process.env.db
  
};