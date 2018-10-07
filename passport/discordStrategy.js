const DiscordStrategy = require('passport-discord').Strategy;
const { clientID, clientSecret } = require('../config');

const discordStrategy = new DiscordStrategy({
  callbackURL: '/auth/discord/redirect',
  clientID,
  clientSecret
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile.id);
  done();
});

module.exports = discordStrategy;