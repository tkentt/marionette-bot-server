import { Strategy as DiscordStrategy }  from 'passport-discord';
import { clientID, clientSecret } from '../config';
import prisma from '../prisma';

const getOrCreateUser = async profile => {
  let user = await prisma.query.user({
    where: { discordId: profile.id }
  }, '{ discordId username email }');

  if (!user) {
    user = await prisma.mutation.createUser({
      data: {
        discordId: profile.id,
        username: profile.username,
        email: profile.email
      }
    }, '{ discordId username email }');
  }

  return user;
};

const discordStrategy = new DiscordStrategy({
  callbackURL: '/auth/discord/redirect',
  clientID,
  clientSecret
}, (accessToken, refreshToken, profile, done) => {
  return getOrCreateUser(profile)
    .then(user => done(null, user))
    .catch(err => done(err));
});

export default discordStrategy;
