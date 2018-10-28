const { Prisma } = require('prisma-binding');
const { PRISMA_ENDPOINT, PRISMA_SECRET } = require('./config');

const db = new Prisma({
  typeDefs: 'prisma-client-js/prisma-schema.js',
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_SECRET,
  debug: false
});

module.exports = db;