const Logger = require('../logger.js')
const logger = new Logger('app');
const os = require('os');

const eventCtrl = {
	getLogs,
};

async function getLogs(req, res) {
    try {
            // const ipAddress = req.getRemoteAddr();
            // const hostName = req.getRemoteHost();
        
            const {app} = req.body
            console.log(req.url)
            console.log(os.hostname())
            console.log(req.originalUrl)
            const fullUrl = `${req.protocol}://${req.get('host')}${req.url}`;

            new Logger(`${app}`);
            logger.info(`Forester log captured url: ${fullUrl} | callingApp: ${app} `);   

        } catch (err) {
            logger.error(err);
        }
}


module.exports = eventCtrl;
