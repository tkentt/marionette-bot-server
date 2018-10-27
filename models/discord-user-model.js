const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discordUserSchema = new Schema({
  id: String,
  name: String
});

module.exports = mongoose.model('DiscordUser', discordUserSchema);