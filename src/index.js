/* eslint-disable no-console */
import { GraphQLServer } from 'graphql-yoga';
import morgan from 'morgan';
import passport from 'passport';

import prisma from './prisma';
import { PORT, CLIENT_ORIGIN } from './config';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import authRouter from './router/auth-router';
import discordStrategy from './passport/discord-strategy';
import initializeBot from './bot';
// import jwtStrategy from './passport/jwt-strategy';
// const { initializeBot } = require('../bot');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: 'src/generated/prisma.graphql',
  resolvers,
  context(request) {
    console.log(request.request.headers);
    return { prisma, request };
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});
// Start Server
server.start({
  port: PORT,
  cors: { origin: CLIENT_ORIGIN }
}, () => console.log(`Server running on port ${PORT}`));

// Express Middleware
// server.express.use(cors());
server.express.use(morgan('common'));
server.express.use(passport.initialize());

// Authentication
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(discordStrategy);
// passport.use(jwtStrategy);

server.express.use('/auth', authRouter);

initializeBot();