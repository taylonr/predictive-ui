'use strict';

var stateController = require('./controller');

module.exports = function(app){
	app.route('/states')
		.post()
		.get(stateController.get);
}