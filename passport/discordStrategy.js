const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { clientID, clientSecret } = require('../config');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id })
    .then(user => done(null, user));
});

const discordStrategy = new DiscordStrategy({
  callbackURL: '/auth/discord/redirect',
  clientID,
  clientSecret
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ discordId: profile.id })
    .then(user => {
      if (user) {
        return user;
      } else {
        return User.create({
          username: profile.username,
          discordId: profile.id
        });
      }
    })
    .then(user => done(null, user))
    .catch(err => done(err));
  done();
});

module.exports = discordStrategy;
