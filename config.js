require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
};
