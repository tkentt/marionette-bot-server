/* eslint-disable no-console */
const cors = require('cors');
const Discord = require('discord.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
// const path = require('path');
// TODO: Figure out what refresh does
const refresh = require('passport-oauth2-refresh');

const { DATABASE_URL, PORT, TOKEN  } = require('./config');
const authRouter = require('./router/authRouter');
const discordStrategy = require('./passport/discordStrategy');
const jwtStrategy = require('./passport/jwtStrategy');
const schema = require('./schema/schema');
const { seedDatabase } = require('./utils/bot');
const client = new Discord.Client();

const Guild = require('./models/guildModel');
const Channel = require('./models/channelModel');
const DiscordUser = require('./models/discordUserModel');

const app = express();

// Use cors
app.use(cors());

// Passport stuff
app.use(passport.initialize());
passport.use(discordStrategy);
passport.use(jwtStrategy);
// TODO: Figure out what refresh does
refresh.use(discordStrategy);

// Log all requests
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// GraphQL endpoint
app.use('/graphql', passport.authenticate('jwt', { session: false, failWithError: true }), graphqlHTTP({
  schema,
  graphiql: true
}));

// Routers
app.use('/auth', authRouter);

if (require.main === module) {
  mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
    .then(() => client.login(TOKEN))
    .catch(err => {
      console.error(err);
    });

  app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  Promise.all([
    Guild.collection.drop(),
    Channel.collection.drop(),
    DiscordUser.collection.drop()
  ])
    .then(seedDatabase(client))
    .catch(err => console.log(err));
});
