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
    const token = req.query.code;
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

router.get(
  '/test',
  passport.authenticate('discord', { failureRedirect: '/', session: false }),
  (req, res) => {
    console.log('working');
  }
);

module.exports = router;