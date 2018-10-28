const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/mutation');
const Query = require('./resolvers/query');

const { DATABASE_URL, PORT } = require('./config');

function createServer() {
  return new GraphQLServer({
    typeDefs: ''
  });
}