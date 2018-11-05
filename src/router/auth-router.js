import express from 'express';
import passport from 'passport';
import createAuthToken from '../utils/create-auth-token';
import { CLIENT_ORIGIN } from '../config';
const router = express.Router();

router.get('/discord', passport.authenticate('discord', {
  scope: ['identify']
}));

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    const token = createAuthToken(req.user);
    res.redirect(`${CLIENT_ORIGIN}?token=${token}`);
  }
);

export default router;