(function(){
	'use strict';

	exports.get = function(req, res){
		var db = require('../database/neo').db;

		db.query('match (n:State) return n', function(err, result){
			res.json(result);
		});

	};
})();