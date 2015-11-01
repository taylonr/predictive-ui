(function () {
	'use strict';

	var db = require('../database/neo').db;

	function createNodeIfNotFound(nodeName){
		db.find({name: nodeName}, function(err, result){
			if(result.length === 0){
				db.save({name: nodeName}, 'State', function(err, result){});
			}
		});
	}

	exports.create = function(req, res){
		createNodeIfNotFound(req.body.fromNode.name);
		createNodeIfNotFound(req.body.toNode.name);
		res.send(200);
	};
})();