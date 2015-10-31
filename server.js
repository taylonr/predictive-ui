var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
	var db = require('seraph')({server: 'http://localhost:7474', pass: 'xoZS!lu9%vPDLa4Uq9PbBP0m2'});

	var cypher = 'match (current:State {name: {name}}) -->(next:State) return  next, count(next) as total order by count(next) desc limit {limit}';

	db.query(cypher, {name: req.query.node, limit: parseInt(req.query.limit, 10)}, function(err, result){
		if (err) console.log(err);
		res.json(result);
	});
});

app.use('/api', router);

app.listen(port);

console.log('API Running on ' + port);