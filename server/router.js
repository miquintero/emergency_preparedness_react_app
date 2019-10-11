const express = require('express');
const router = express.Router();

const controller = require('./controller/index');

router.get('/alerts/:city', controller.getAlert); 
router.get('/seeda', controller.seedAlerts);

router.get('/disaster', controller.getPreparations);
router.get('/seedp', controller.seedPreparations);

module.exports = router;