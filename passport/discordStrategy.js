const DiscordStrategy = require('passport-discord').Strategy;
const { clientID, clientSecret } = require('../config');

const discordStrategy = new DiscordStrategy({
  callbackURL: '/auth/discord/redirect',
  clientID,
  clientSecret
}, () => {
  console.log('help');
});

module.exports = discordStrategy;