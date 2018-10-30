/* eslint-disable no-console */
import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import morgan from 'morgan';
import passport from 'passport';

import prisma from './prisma';
import { PORT } from './config';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
// const authRouter = require('./router/auth-router');
// const discordStrategy = require('./passport/discord-strategy');
// const jwtStrategy = require('./passport/jwt-strategy');
// const { initializeBot } = require('../bot');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: 'src/generated/prisma.graphql',
  resolvers,
  context: { prisma },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

// Start Server
server.start(PORT, () => console.log(`Server running on port ${PORT}`));

// Express Middleware
server.express.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
server.express.use(cors());
server.express.use(passport.initialize());

// Authentication
// passport.use(discordStrategy);
// passport.use(jwtStrategy);

// server.express.use('/auth', authRouter);
