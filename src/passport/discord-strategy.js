import { Strategy as DiscordStrategy }  from 'passport-discord';
import { clientID, clientSecret } from '../config';
import prisma from '../prisma';

const upsertUser = async profile => {
  const userInfo = {
    discordId: profile.id,
    username: profile.username,
    email: profile.email
  };

  const user = await prisma.mutation.upsertUser({
    where: { discordId: profile.id },
    create: userInfo,
    update: userInfo
  }, '{ discordId username email }');

  return user;
};

const discordStrategy = new DiscordStrategy({
  callbackURL: '/auth/discord/redirect',
  clientID,
  clientSecret
}, (accessToken, refreshToken, profile, done) => {
  return upsertUser(profile)
    .then(user => done(null, user))
    .catch(err => done(err));
});

export default discordStrategy;
