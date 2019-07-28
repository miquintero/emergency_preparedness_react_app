const express = require('express');
const router = express.Router();

const controller = require('./controller/index');

router.get('/alerts/:city', controller.getAlert); //don't change path!

router.get('/alerts', controller.getPreparations);

module.exports = router;