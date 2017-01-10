'use strict'

var router = require('express').Router();

// Plug the routes
router.use('/', require('./raw'));

module.exports = router;