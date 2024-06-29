/* eslint-disable @typescript-eslint/no-var-requires */
const Logger = require("../logger.js");
const logger = new Logger("app");
const os = require("os");

async function getLogs(req, res, next) {
  if (req.body === null || undefined) next();
  try {
    console.log(req.body);
    const { app, message } = req.body;
    console.log(req.url);
    console.log(os.hostname());
    console.log(req.originalUrl);
    const fullUrl = `${req.protocol}://${req.get("host")}${req.url}`;

    const log = new Logger(`${app}`);
    if (log) {
      log.info(
        `From Forester log captured: url: ${fullUrl} | callingApp: ${app} | hostname: ${os.hostname()} | msg: ${message}`
      );
    }
    logger.info(
      `Forester log captured url: ${fullUrl} | callingApp: ${app} | hostname: ${os.hostname()} | msg: ${message} `
    );
    return res.json({ status: "Success" });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ msg: err.message });
  }
}

const eventCtrl = {
  getLogs,
};

module.exports = eventCtrl;
