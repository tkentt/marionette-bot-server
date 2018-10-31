import express from 'express';
import passport from 'passport';
import createAuthToken from '../utils/create-auth-token';
const router = express.Router();

router.get('/discord', passport.authenticate('discord', {
  scope: ['identify']
}));

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    const token = createAuthToken(req.user);
    res.redirect(`http://localhost:3000/auth?token=${token}`);
  }
);

export default router;