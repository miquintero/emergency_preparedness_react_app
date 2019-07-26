const express = require('express');
const router = express.Router();

const controller = require('./controller/index');

router.get('/alerts', controller.getAlert);

router.get('/alerts/emergency', controller.getPreparations);


module.exports = router;