const express = require('express');
const bodyParser = require('body-parser')
const Logger = require('./logger.js')
const toobusy = require('toobusy-js');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const PORT = 4000;

const app = express();

app.use(xss());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, 'Server too busy!');
  } else {
    next();
  }
});

const whitelist = [
    'https://forester-0vee.onrender.com', 
    'http://localhost:4000'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

let rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100, // maximum number of request inside a window
  message: 'You have exceeded the 100 requests in 24 hrs limit!', // the message when they exceed limit
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(rateLimiter);

const logger = new Logger('forester');
const eventRouter = require('./routes/event');

app.use('/event', eventRouter);
    
app.listen(PORT, () => {
    logger.info(`APP LAUNCHED IN PORT: ${PORT}`)
  });