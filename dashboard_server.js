
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

console.log("START");

app.get('/dashboard.html', function(req,res) {
        res.sendfile("dashboard.html");
});

app.listen(3002,function () {
        console.log("started on port 3002");
});

