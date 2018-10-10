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
    console.log(req.query);
    res.redirect('http://localhost:3000');
  }
);

module.exports = router;