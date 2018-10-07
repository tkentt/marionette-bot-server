const DiscordStrategy = require('passport-discord').Strategy;
const { clientID, clientSecret } = require('../config');
const User = require('../models/userModel');

const discordStrategy = new DiscordStrategy({
  callbackURL: '/auth/discord/redirect',
  clientID,
  clientSecret
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ discordId: profile.id })
    .then(user => {
      if (!user) {
        User.create({
          username: profile.username,
          discordId: profile.id
        });
      } else {
        return user;
      }
    })
    .then(user => console.log(user))
    .catch(err => done(err));
  done();
});

module.exports = discordStrategy;
