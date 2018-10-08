/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const cookieSession = require('cookie-session');

const { DATABASE_URL, PORT, SECRET } = require('./config');
const authRouter = require('./router/authRouter');
const discordStrategy = require('./passport/discordStrategy');

const app = express();

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [SECRET]
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(discordStrategy);
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
