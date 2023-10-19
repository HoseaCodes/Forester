const winston = require('winston');
require('winston-mongodb');

//function to return the current date and time
dateFormat = () => {
  return new Date(Date.now()).toUTCString()
}

//Custom Logger class
class LoggerService {
  constructor(route) {
    this.log_data = null
    this.route = route

    const logger = winston.createLogger({
      transports: [
        //Declare the winston transport, and 
        //assign it to our log files 
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`
        }),
        new winston.transports.MongoDB({
          db: process.env.MONGODB_URL || "mongodb://localhost:27017/forester",
          level: "info",
          collection: route,
          tryReconnect: true,
          options: {
              useUnifiedTopology: true,
          }
        })
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename:  `./logs/${route}-exceptions.log` })
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: `./logs/${route}-rejections.log` })
      ],

      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
        message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
        return message
      })
    });

    logger.profile(route, { level: 'debug' })


    this.logger = logger;

  }

  setLogData(log_data) {
    this.log_data = log_data;
  }

  async info(message) {
    this.logger.log('info', message);
  }
  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    });
  }

  async debug(message) {
    this.logger.log('debug', message);
  }

  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj
    });
  }

  async error(message) {
    this.logger.log('error', message);
  }

  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    });
  }

}

module.exports = LoggerService