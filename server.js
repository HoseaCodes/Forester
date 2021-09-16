const express = require('express');
const bodyParser = require('body-parser')
const Logger = require('./logger.js')
const morgan = require('morgan');
const PORT = 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const logger = new Logger('app');
const eventRouter = require('./routes/event');

app.use('/event', eventRouter);
    
app.listen(PORT, () => {
    logger.info(`APP LAUNCHED IN PORT: ${PORT}`)
  });