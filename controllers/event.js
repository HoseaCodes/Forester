const Logger = require('../logger.js')
const logger = new Logger('app');
const os = require('os');

const eventCtrl = {
	getLogs,
};

async function getLogs(req, res, next) {
    if(req.body === null || undefined) next();
    
    try {
            console.log(req.body)
            const {app} = req.body
            console.log(req.url)
            console.log(os.hostname())
            console.log(req.originalUrl)
            const fullUrl = `${req.protocol}://${req.get('host')}${req.url}`;

            let log = new Logger(`${app}`);
            if(log) {
                log.info(`Forester log captured url: ${fullUrl} | callingApp: ${app} `);
            }
            logger.info(`Forester log captured url: ${fullUrl} | callingApp: ${app} `);   
            res.json({ status: "Success"})
        } catch (err) {
            logger.error(err);
            
            return res.status(500).json({ msg: err.message })
        }
}


module.exports = eventCtrl;
