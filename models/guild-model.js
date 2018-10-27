const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema({
  id: String,
  name: String,
  channels: [String]
});

module.exports = mongoose.model('Guild', guildSchema);