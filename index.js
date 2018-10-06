/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { DATABASE_URL, PORT } = require('./config');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, () => {
  console.log('connected to mongodb');
});
console.log(DATABASE_URL);

const server = app.listen(PORT, () => {
  console.info(`App listening on port ${server.address().port}`);
});
