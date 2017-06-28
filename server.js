// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan'); 		// used to see requests
var mongoose    = require('mongoose');
var config 	    = require('./config');
var path 	    = require('path');
var fs          = require('fs');
var http        = require('http');
var https       = require('https');

var privateKey  = fs.readFileSync('sslcert/server.key');
var certificate = fs.readFileSync('sslcert/server.crt');

var app         = express();
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// APP CONFIGURATION ==================
// ====================================
// used body parser to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

mongoose.connect(config.database);

// set static files location
app.use(express.static(__dirname + '/public'));

// ROUTES FOR API =================
// ====================================

// API ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ====================================
httpServer.listen(config.port);
console.log('Magic happens on port ' + config.port);
