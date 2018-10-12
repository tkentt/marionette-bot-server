const graphql = require('graphql');
const Guild = require('../models/guildModel');
const Channel = require('../models/channelModel');
const DiscordUser = require('../models/discordUserModel');

const {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const GuildType = new GraphQLObjectType({
  name: 'Guild',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    channels: {
      type: new GraphQLList(ChannelType),
      resolve(parent) {
        return Channel.find().sort('name')
          .then(channels => {
            return channels.filter(channel => {
              return parent.channels.includes(channel.id);
            });
          });
      }
    }
  })
});

const ChannelType = new GraphQLObjectType({
  name: 'Channel',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    guild: {
      type: GuildType,
      resolve(parent) {
        return Guild.findOne({ channels: parent.id });
      }
    }
  })
});

const DiscordUserType = new GraphQLObjectType({
  name: 'DiscordUser',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Find one Guild using the id
    guild: {
      type: GuildType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Guild.findOne({ id: args.id });
      }
    },
    // Find all Guilds
    guilds: {
      type: new GraphQLList(GuildType),
      resolve() {
        return Guild.find().sort('name');
      }
    },
    // Find one Channel using the id
    channel: {
      type: ChannelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Channel.findOne({ id: args.id });
      }
    },
    // Find all Channels
    channels: {
      type: new GraphQLList(ChannelType),
      resolve() {
        return Channel.find().sort('name');
      }
    },
    // Find one DiscordUser using the id
    discordUser: {
      type: DiscordUserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return DiscordUser.findOne({ id: args.id });
      }
    },
    // Find all Channels
    discordUsers: {
      type: new GraphQLList(DiscordUserType),
      resolve() {
        return DiscordUser.find().sort('name');
      }
    },

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});