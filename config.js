require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL,
  TOKEN: process.env.TOKEN,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  SECRET: process.env.SECRET
};
