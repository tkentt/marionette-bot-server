/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';

const { DATABASE_URL, PORT } = require('../config');
const authRouter = require('../router/auth-router');
const discordStrategy = require('../passport/discord-strategy');
const jwtStrategy = require('../passport/jwt-strategy');
const schema = require('../schema/schema');
const { initializeBot } = require('../bot');

const app = express();

// Use cors
app.use(cors());

// Passport stuff
app.use(passport.initialize());
passport.use(discordStrategy);
passport.use(jwtStrategy);

// Log all requests
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// GraphQL endpoint
app.use('/graphql', passport.authenticate('jwt', { session: false, failWithError: true }), graphqlHTTP((req) => ({
  schema,
  graphiql: true,
  context: {
    user: req.user,
  }
})));

// Routers
app.use('/auth', authRouter);

if (require.main === module) {
  mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
    .then(() => initializeBot())
    .catch(err => console.error(err));

  app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => console.error(err));
}