'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var controller = require('../../app/states/controller');
var db = require('../../app/database/neo').db;

describe('States controller', function(){
	describe('Getting states', function(){
		var query,
			val,
			req,
			res;

		beforeEach(function(){
			query = sinon.spy(db, 'query');
			req = {},
			res = {
				json: function(data){
					val = data;
				}
			};
		});

		afterEach(function(){
			if(db.query.restore){
				db.query.restore();
			}
		});

		it('Should call query', function(){
			controller.get(req,res);

			expect(query.calledOnce).to.be.true;
		});

		it('Should call query to get all nodes', function(){
			controller.get({}, res);

			expect(query.calledWith('match (n:State) return n')).to.be.true;
		});

		it('Should get all states', function(){
			
			db.query = function(q, callback){
				callback(undefined, [{name: 'test'}]);
			};

			controller.get(req, res);

			expect(val).to.deep.equal([{name: 'test'}]);
		});
	});
});