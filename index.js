/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const { PORT } = require('./config');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

const server = app.listen(PORT, () => {
  console.info(`App listening on port ${server.address().port}`);
});