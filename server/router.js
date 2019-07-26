const express = require('express');
const router = express.Router();

const controller = require('./controller/index');

router.get('/alerts', controller.getAlert);
router.get('/alerts/seed', controller.seedAlerts);

router.get('/alerts/emergency', controller.getPreparations);
router.get('/alerts/seeds', controller.seedPreparations);


module.exports = router;