var app = require('../index.js');
var server = app.listen(8080);
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var request = require("request");

var events = [];

describe("Simple Agenda Tests", function () {
    after(function (done) {
        server.close();
        done();
    });

    describe("The Main Page Set Up", function() {
		it('Should Set Up Page Successfully', function(done) {
	    	request('http://localhost:3000' , function(error, response, body) {
		        expect(response.statusCode).to.equal(200);
		        done();
		    });
		});
	});

	describe("Testing add event endpoint", function() {
		describe("1. Add new valid event", function() {
			it('should successfully add event', function(done) {
				var event = {
					description: 'Birthday',
					date: '2019-03-05',
					start_time: '05:00',
					end_time: '10:00'
				};

			    events.push(event);

				var url = 'http://localhost:3000/add-event';
			    request.post({ 
	                url : url, 
	                json: event },
	                function (error, response, body) {
	                    expect(response.statusCode).to.equal(200);
		        		done();
	                }
            	);
			});
		});

		describe("2. Adding event that starts earlier and ends during prior event ends doesn't work ", function() {
			it('should fail to add', function(done) {
				var event = {
					description: 'Soccer',
					date: '2019-03-05',
					start_time: '04:00',
					end_time: '06:00'
				};

				var url = 'http://localhost:3000/add-event';
			    request.post({ 
	                url : url, 
	                json: event },
	                function (error, response, body) {
	                    expect(response.statusCode).to.not.equal(200);
		        		done();
	                }
            	);
			});
		});

		describe("3. Adding event that starts during prior event doesn't work ", function() {
			it('should fail to add', function(done) {
				var event = {
					description: 'Avengers Movie',
					date: '2019-03-05',
					start_time: '08:00',
					end_time: '11:00'
				};

				var url = 'http://localhost:3000/add-event';
			    request.post({ 
	                url : url, 
	                json: event },
	                function (error, response, body) {
	                    expect(response.statusCode).to.not.equal(200);
		        		done();
	                }
            	);
			});
		});

		describe("4. Adding event at the same time ", function() {
			it('should fail to add', function(done) {
				var event = {
					description: 'Anniversary',
					date: '2019-03-05',
					start_time: '05:00',
					end_time: '10:00'
				};

				var url = 'http://localhost:3000/add-event';
			    request.post({ 
	                url : url, 
	                json: event },
	                function (error, response, body) {
	                    expect(response.statusCode).to.not.equal(200);
		        		done();
	                }
            	);
			});
		});

		describe("5. Adding event right after/before event works ", function() {
			it('should add successfully', function(done) {
				var event = {
					description: 'Game of Thrones Viewing ',
					date: '2019-03-05',
					start_time: '10:01',
					end_time: '11:00'
				};

				events.push(event);

				var url = 'http://localhost:3000/add-event';
			    request.post({ 
	                url : url, 
	                json: event },
	                function (error, response, body) {
	                    expect(response.statusCode).to.equal(200);
		        		done();
	                }
            	);
			});
		});

		describe("6. Adding event different day at same time works ", function() {
			it('should add successfully', function(done) {
				var event = {
					description: 'Mom\'s Birthday',
					date: '2019-08-21',
					start_time: '05:00',
					end_time: '10:00'
				};

				events.push(event);

				var url = 'http://localhost:3000/add-event';
			    request.post({ 
	                url : url, 
	                json: event },
	                function (error, response, body) {
	                    expect(response.statusCode).to.equal(200);
		        		done();
	                }
            	);
			});
		});
	});

	describe("Testing events endpoint", function() {
		describe("Call retrieve events endpoint", function() {
			it('should call successfully', function(done) {
				var url = 'http://localhost:3000/events';
				request.get({ 
	                url : url },
	                function (error, response, body) {
	                    expect(response.statusCode).to.equal(200);
		        		done();
	                }
            	);
			});
		});

		describe("Add event and retrieve events already added", function() {
			it('retrieve events added already successfully', function(done) {
			    var url = 'http://localhost:3000/events';
				request.get({ 
	                url : url },
	                function (error, response, body) {
	                	//var reqBody = JSON.stringify(response.body);
						var reqBody = JSON.parse(response.body);
	                	expect(response.statusCode).to.equal(200);
	                    expect(reqBody["data"]).to.have.deep.members(events);
		        		done();
	                }
            	);
			});
		});
	});
});