require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL,
  TOKEN: process.env.TOKEN,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  SECRET: process.env.SECRET,
  PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.PRISMA_SECRET
};
