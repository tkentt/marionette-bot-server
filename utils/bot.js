const Guild = require('../models/guild-model');
const Channel = require('../models/channel-model');
const DiscordUser = require('../models/discord-user-model');

const seedDatabase = (client) => {
  Promise.all([
    Guild.createIndexes(),
    insertGuilds(client.guilds.array()),
    Channel.createIndexes(),
    insertChannels(client.channels.array()),
    DiscordUser.createIndexes(),
    insertDiscordUsers(client.users.array())
  ]);
};

const insertGuilds = guilds => {
  const newGuilds = guilds.map(guild => {
    return {
      id: guild.id,
      name: guild.name,
      channels: guild.channels.array()
        .filter(channel => channel.type === 'text')
        .map(channel => channel.id)
    };
  });
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

const insertDiscordUsers = discordUsers => {
  const newDiscordUsers = discordUsers.map(discordUser => ({
    id: discordUser.id,
    name: discordUser.username
  }));
  return DiscordUser.insertMany(newDiscordUsers);
};

module.exports = {
  seedDatabase
};