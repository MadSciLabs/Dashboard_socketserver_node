
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require('request');
var express = require('express');
var server;

var app = express();
app.use(express.static('public'));
app.use(express.static('js'));

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/dcsay', function(request, res ){

	_t = new Date().toISOString()

	console.log(_t);
	console.log(request.body);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({status: "ok"}));
});

app.get('/dctest', function(request, res) {

	console.log(res.body);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({status: "ok dc test"}));
});


app.listen(80,function () {
        console.log("started on port 80");
});

