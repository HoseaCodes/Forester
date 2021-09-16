const router = require('express').Router();
const eventCtrl = require('../controllers/event');

router.route('/')
    .post(eventCtrl.getLogs)

module.exports = router