'use strict'

var router = require('express').Router();

// Routes List
router.get('/raw', require('./raw'));

module.exports = router;