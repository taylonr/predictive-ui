(function(){
	'use strict';

	var chai = require('chai');
	var expect = chai.expect;
	var sinon = require('sinon');

	describe('Database', function(){
		it('Should create a new database', function(){
			var db = require('../../app/database/neo').db;
			expect(db.query).not.to.be.undefined;
		});

		describe('When called multiple times', function(){
			it('Should return the same instance', function(){
				var db = require('../../app/database/neo').db;

				var db2 = require('../../app/database/neo').db;
				expect(db).to.equal(db2);
			});
		});
	});
})();