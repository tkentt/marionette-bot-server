const router = require('express').Router();
const passport = require('passport');

// auth with discord
router.get('/discord', passport.authenticate('discord', {
  scope: ['identify', 'email', 'guilds']
}));

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    // TODO: Send user JWT
    // temp code to check if it is returning the user
    res.json(req.user.serialize());
    // res.redirect('/');
  }
);

module.exports = router;