(function () {
	'use strict';

	var chai = require('chai');
	var expect = chai.expect;
	var sinon = require('sinon');

	var controller = require('../../app/relationships/relationship.controller');
	var db = require('../../app/database/neo').db;

	describe('Relationship controller', function () {
		var req,
			res;

		beforeEach(function(){
			req = {
				body: {
					fromNode: {name: 'node1'},
					toNode: {name: 'node2'}
				}
			};
		});

		describe('When the first node is not found', function () {
			var find;

			beforeEach(function(){
				sinon.stub(db, 'save');
				find = sinon.stub(db, 'find');
			});

			afterEach(function(){
				db.save.restore();
				find.restore();
			});

			it('Should add a new node1', function () {
				find.withArgs({name: 'node1'}).callsArgWith(1, undefined, []);
				find.withArgs({name: 'node2'}).callsArgWith(1, undefined, [{name: 'node2', id: 1}]);

				controller.create(req, res);

				expect(db.save.calledWith({name: 'node1'}, 'State')).to.be.true;
			});
		});

		describe('When the first node is found', function () {
			var find;

			beforeEach(function(){
				sinon.stub(db, 'save');
				find = sinon.stub(db, 'find');
			});

			afterEach(function(){
				db.save.restore();
				find.restore();
			});

			it('Should not save the node', function () {
				find.withArgs({name: 'node1'}).callsArgWith(1, undefined, [{name: 'node1', id: 1}]);
				find.withArgs({name: 'node2'}).callsArgWith(1, undefined, [{name: 'node2', id: 1}]);

				controller.create(req, res);

				expect(db.save.calledWith({name: 'node1'}, 'State')).to.be.false;
			});
		});

		describe('When the second node is not found', function () {
			var find;

			beforeEach(function(){
				sinon.stub(db, 'save');
				find = sinon.stub(db, 'find');
			});

			afterEach(function(){
				db.save.restore();
				find.restore();
			});

			it('Should add a new node1', function () {
				find.withArgs({name: 'node2'}).callsArgWith(1, undefined, []);
				find.withArgs({name: 'node1'}).callsArgWith(1, undefined, [{name: 'node1', id: 1}]);

				controller.create(req, res);

				expect(db.save.calledWith({name: 'node2'}, 'State')).to.be.true;
			});
		});

		describe('When the second node is found', function () {
			var find;

			beforeEach(function(){
				sinon.stub(db, 'save');
				find = sinon.stub(db, 'find');
			});

			afterEach(function(){
				db.save.restore();
				find.restore();
			});

			it('Should not save the node', function () {
				find.withArgs({name: 'node2'}).callsArgWith(1, undefined, [{name: 'node2', id: 1}]);

				controller.create(req, res);

				expect(db.save.calledWith({name: 'node2'}, 'State')).to.be.false;
			});
		});

		describe('When both nodes are found', function () {
			var find;

			beforeEach(function(){
				sinon.stub(db, 'save');
				find = sinon.stub(db, 'find');
				sinon.stub(db, 'relate');

			});

			afterEach(function(){
				db.save.restore();
				find.restore();
				db.relate.restore();
			});

			it('Should create a new relationship', function (done) {

				var res = {
					sendStatus: function(){
						done();
						expect(db.relate.calledWith([1, 'called', 2])).to.be.true;
					}
				};

				find.withArgs({name: 'node1'}).callsArgWith(1, undefined, [{name: 'node1', id: 1}]);
				find.withArgs({name: 'node2'}).callsArgWith(1, undefined, [{name: 'node2', id: 2}]);

				controller.create(req, res);
			});
		});
	});
})();