/* eslint-disable no-console */
import { GraphQLServer } from 'graphql-yoga';
import prisma from './prisma';
import { PORT } from '../config';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';

// import cors from 'cors';
// import express from 'express';
// import graphqlHTTP from 'express-graphql';
// import mongoose from 'mongoose';
// import morgan from 'morgan';
// import passport from 'passport';

// const authRouter = require('../router/auth-router');
// const discordStrategy = require('../passport/discord-strategy');
// const jwtStrategy = require('../passport/jwt-strategy');
// const schema = require('../schema/schema');
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

server.start(PORT, () => console.log(`Server running on port ${PORT}`));

// // Use cors
// app.use(cors());

// // Passport stuff
// app.use(passport.initialize());
// passport.use(discordStrategy);
// passport.use(jwtStrategy);

// // Log all requests
// server.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// // Routers
// app.use('/auth', authRouter);

// if (require.main === module) {
//   mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
//     .then(() => initializeBot())
//     .catch(err => console.error(err));

//   app.listen(PORT, function() {
//     console.info(`Server listening on ${this.address().port}`);
//   }).on('error', err => console.error(err));
// }