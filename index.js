/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
// TODO: Figure out what refresh does
const refresh = require('passport-oauth2-refresh');

const { DATABASE_URL, PORT } = require('./config');
const authRouter = require('./router/authRouter');
const discordStrategy = require('./passport/discordStrategy');

const app = express();

// Passport stuff
app.use(passport.initialize());
passport.use(discordStrategy);
// TODO: Figure out what refresh does
refresh.use(discordStrategy);

// Log all requests
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// Create a static web server
app.use(express.static('public'));

// Routers
app.use('/auth', authRouter);

// Connect to database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, () => {
  console.log('connected to mongodb');
});

// Start server
const server = app.listen(PORT, () => {
  console.info(`App listening on port ${server.address().port}`);
});
