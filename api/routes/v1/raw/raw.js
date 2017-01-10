'use strict';

var router = require('express').Router();
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require('../../../server/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

router.get('/raw', function(req, res) {
	
	var regional = 'default';
	var date_start = 'default';
	var date_end = 'default';
	
	if (req.query.regional === undefined) {regional} else {regional = req.query.regional}
	if (req.query.date_start === undefined) {date_start} else {date_start = req.query.date_start}
	if (req.query.date_end === undefined) {date_end} else {date_end = req.query.date_end}
	
	var sql_string = 'SELECT * FROM TestBed.dbo.f_BlockingRate ('+regional+','+date_start+','+date_end+') ORDER BY [date]';
	
	sequelize.query(sql_string, { type: Sequelize.QueryTypes.SELECT}).then(function(queryResult) {
		var data = [];
		var i;
		for (i=0; i < queryResult.length; ++i) {
			data.push(queryResult[i].voice_utilization)
		}
		
		if (queryResult.length == 0) {
			res.json({
				status: 404,
				msg: 'Not found',
				requested_query: req.query
			})
		} else {
			res.json({
				status: 200,
				msg: 'Ok',
				requested_query: req.query,
				data
			})
		}

		// res.json({
			// status: 200,
			// data
		// })
	})
})

module.exports = router;