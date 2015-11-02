(function () {
	'use strict';

	var db = require('../database/neo').db;

	function createNodeIfNotFound(nodeName){
		return new Promise(function(resolve, reject){
			db.find({name: nodeName}, function(err, result){
				if(err){
					reject(err);
				}

				if(result.length === 0){
					db.save({name: nodeName}, 'State', function(err, result){
						if(err){
							reject(err);
						}

						resolve(result);
					});
				}

				resolve(result[0]);
			});
		});
	}

	exports.create = function(req, res){
		Promise.all([
			createNodeIfNotFound(req.body.fromNode.name),
			createNodeIfNotFound(req.body.toNode.name)
		]).then(function(data){
			db.relate(data[0].id, 'called', data[1].id, function(){});
			res.sendStatus(200);
		}, function(err){
			console.log('Rejected', err);
		});
	};
})();