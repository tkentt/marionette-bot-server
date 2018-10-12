const graphql = require('graphql');
const Guild = require('../models/guildModel');
const Channel = require('../models/channelModel');

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
      resolve(parent, args) {
        return Channel.find()
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
      resolve(parent, args) {
        return Guild.findOne({ channels: parent.id });
      }
    }
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
    // Find all Guild using the id
    guilds: {
      type: new GraphQLList(GuildType),
      resolve(parent, args) {
        return Guild.find();
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
    channels: {
      type: new GraphQLList(ChannelType),
      resolve(parent, args) {
        return Channel.find();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});