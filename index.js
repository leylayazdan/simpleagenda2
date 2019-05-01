// Require dependencies
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// Declare application parameters
var PORT = process.env.PORT || 3000;
var STATIC_ROOT = path.resolve(__dirname, './public');

// Defining CORS middleware to enable CORS.
// (should really be using "express-cors",
// but this function is provided to show what is really going on when we say "we enable CORS")
function cors(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
  	next();
}

// Instantiate an express.js application
var app = express();

// Configure the app to use a bunch of middlewares
app.use(express.json());							// handles JSON payload
app.use(express.urlencoded({ extended : true }));	// handles URL encoded payload
app.use('/', express.static(STATIC_ROOT));			// Serve STATIC_ROOT at URL "/" as a static resource
app.use(cors);

var events = [];

/*// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) */

// Configure '/events' endpoint
app.get('/events', function(req, res) {
	res.json({data: events})
}); 

// Configure '/add-event' endpoint
app.post('/add-event', function(req, res) {
	var new_event = req.body;

	if (Object.keys(new_event).length !== 0) {
		console.log(new_event);
		var fn = function checkOverlap(event) {
			return new Promise(function(resolve, reject) {
				if (event.date == new_event.date && (event.start_time < new_event.end_time && new_event.start_time < event.end_time 
					|| event.start_time == new_event.start_time && event.end_time == new_event.end_time)) {
					reject();
				} else {
					resolve();
				}
			});
		}

		if (events.length > 0) {
			var checkEvents = events.map(fn);
			var results = Promise.all(checkEvents);
			results.then(function() {
				events.push(new_event);
				res.status(200).send({success: true});
			}).catch(function() {
				res.status(500).send({success: false});
			});
		} else {
			events.push(new_event);
			res.status(200).send({success: true});
		}
	} 
});

// Start listening on TCP port
app.listen(PORT, function(){
    console.log('Express.js server started, listening on PORT '+PORT);
});

module.exports = app;