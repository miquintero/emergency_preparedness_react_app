const express = require('express');
const router = express.Router();

const controller = require('./controller/index');

router.get('/alerts/:city', controller.getAlert); //don't change path!
router.get('/seeda', controller.seedAlerts);

router.get('/disaster/:type', controller.getPreparations);
router.get('/seedp', controller.seedPreparations);

module.exports = router;