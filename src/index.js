/* eslint-disable no-console */
import '@babel/polyfill';
import { GraphQLServer } from 'graphql-yoga';
import morgan from 'morgan';
import passport from 'passport';

import prisma from './prisma';
import { PORT, CLIENT_ORIGIN } from './config';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import authRouter from './router/auth-router';
import discordStrategy from './passport/discord-strategy';
import startClient from './bot/start-client';
import client from './bot/client';
import authMiddleware from './resolvers/auth-middleware';

// Setup Server
const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: 'src/generated/prisma.graphql',
  resolvers,
  context(req) {
    return { prisma, ...req };
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  middlewares: [authMiddleware]
});

server.start({
  port: PORT,
  cors: { origin: CLIENT_ORIGIN },
  endpoint: '/api',
  getEndpoint: true
}, () => console.log(`Server running on port ${PORT}`));

// Express Middleware
server.express.use(morgan('common'));
server.express.use(passport.initialize());

// Authentication
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(discordStrategy);

server.express.use('/auth', authRouter);

startClient(client);