const router = require('express').Router();
const passport = require('passport');

// auth with google
router.get('/discord', passport.authenticate('discord', {
  scope: ['identify', 'email', 'guilds', 'rpc.api']
}));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.json(req.user);
});

module.exports = router;