'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Sequelize = require('sequelize');
var port = process.env.PORT || 3000;

// Get request parameter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log to console
app.use(morgan('dev'));

// Routes
app.use('/', require('./routes'));

// Test Routes
app.get('/', function(req, res) {
	res.send('RPM Dashboard API is running on http://localhost:' + port)
})

// Start server
app.listen(port);