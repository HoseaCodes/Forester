const express = require('express');
const bodyParser = require('body-parser')
const Logger = require('./logger.js')
const PORT = 4000;
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const logger = new Logger('app');

app.post('/event', (req, res) => {
    try {
        const ipAddress = req.getRemoteAddr();
        const hostName = req.getRemoteHost();

        console.log(ipAddress, hostName)
        new Logger(`${req.body}`);
        logger.info(`Forester log captured ${req.body}`);

    } catch (err) {
        logger.error(err);
    }
});
    
app.listen(PORT, () => {
    logger.info(`APP LAUNCHED IN PORT: ${PORT}`)
  });