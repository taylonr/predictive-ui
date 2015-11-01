require('app-module-path').addPath(__dirname);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.listen(port);

require('app/relationships/routes')(app);
require('app/states/routes')(app);

console.log('API Running on ' + port);