const router = require('express').Router();
const passport = require('passport');

// auth with discord
router.get('/', passport.authenticate('discord', {
  scope: ['identify', 'email', 'guilds']
}));

router.get(
  '/redirect',
  passport.authenticate('discord', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://localhost:3000/auth?token=${token}`);
  }
);

module.exports = router;