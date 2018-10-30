const router = require('express').Router();
const passport = require('passport');
const createAuthToken = require('../utils/create-auth-token');

router.get('/discord', passport.authenticate('discord', {
  scope: ['identify', 'email', 'guilds']
}));

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    const token = req.query.code;
    res.redirect(`http://localhost:3000/auth?token=${token}`);
  }
);


module.exports = router;