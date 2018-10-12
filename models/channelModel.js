const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  id: String,
  name: String
});

module.exports = mongoose.model('Channel', channelSchema);