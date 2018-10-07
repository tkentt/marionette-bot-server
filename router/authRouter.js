const router = require('express').Router();
const passport = require('passport');

// auth with google
router.get('/discord', passport.authenticate('discord', {
  scope: ['identify', 'email', 'guilds', 'rpc.api']
}));

module.exports = router;