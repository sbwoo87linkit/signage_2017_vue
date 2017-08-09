var path = require('path');
var qs = require('querystring');

var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var request = require('request');
var auth = require('./routes/auth')
// var multer = requiere('multer')

var config = require('./config');


mongoose.connect(config.MONGO_URI, {
  useMongoClient: true,
  /* other options */
});
mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(express.static(path.join(__dirname, '../client')));

// [CONFIGURE AUTH]
app.all('*', function(req,res,next) {
  if (req.path.startsWith('/api/client') || req.path.startsWith('/api/users/login') || req.path.startsWith('/api/users/signup')  ) {
    next();
  }
  else {
    auth.ensureAuthenticated(req,res,next);
  }
});

// [CONFIGURE ROUTER]
require('./routes/client')(app);
require('./routes/schedule')(app);
require('./routes/user')(app);
require('./routes/customer')(app);
require('./routes/group')(app);
require('./routes/content')(app);
require('./routes/player')(app);



/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), app.get('host'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
