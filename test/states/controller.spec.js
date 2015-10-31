'use strict';

var chai = require('chai');
var expect = chai.expect;

var controller = require('../../app/states/controller');

describe('States controller', function(){
	describe('Getting states', function(){
		it('Should return 200', function(){
			var req = {};
			var val;
			var res = {
				json: function(data){
					val = data;
				}
			};

			controller.get(req,res);

			expect(val).to.equal(200);
		});
	});
});