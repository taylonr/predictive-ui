'use strict';

exports.get = function(req, res){
	var db = require('../database/neo').db;

	db.query('match (n) return n', function(err, result){
		res.json(result);
	});

};