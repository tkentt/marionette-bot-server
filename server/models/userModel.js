const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  discordId: String
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    discordId: this.discordId
  };
};

module.exports = mongoose.model('User', userSchema);
