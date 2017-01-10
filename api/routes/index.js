'use strict'

var router = require('express').Router();

// Plug the routes
router.use('/api/v1', require('./v1'));

module.exports = router;