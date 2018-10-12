const Guild = require('../models/guildModel');
const Channel = require('../models/channelModel');
const User = require('../models/userModel');

const seedDatabase = (client) => {
  Promise.all([
    insertGuilds(client.guilds.array()),
    insertChannels(client.channels.array())
  ]);
};

const insertGuilds = guilds => {
  const newGuilds = guilds.map(guild => ({
    id: guild.id,
    name: guild.name
  }));
  return Guild.insertMany(newGuilds);
};

const insertChannels = channels => {
  const newChannels = channels
    .filter(channel => channel.type === 'text')
    .map(channel => ({
      id: channel.id,
      name: channel.name
    }));
  return Channel.insertMany(newChannels);
};

const insertUsers = users => {
  const newUsers = users.map(user => ({
    id: user.id,
    name: user.name
  }));
  return User.isertMany(newUsers);
};

module.exports = {
  seedDatabase
};