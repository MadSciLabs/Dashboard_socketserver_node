
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require('request');
var express = require('express');
var server;

//var arrSymbols = ['GOOG', 'AAPL', 'NDAQ', 'FB' ];
var arrSymbols = ['FB', 'GOOG', 'AAPL', 'CERN' ];
var arrColors = [ 0,1,2,3 ];

var _currIndex = 0;

var app = express();
app.use(express.static('public'));
app.use(express.static('js'));

var bodyParser = require('body-parser');

app.use(bodyParser.json());

console.log("START");

var _stockArr = "";

//MAKE SYMBOL STRING
for (var i=0; i<arrSymbols.length; i++) {
	if (i>0) {_stockArr += ",";}
	_stockArr += arrSymbols[i];
}

var sPhoton1 = "280045000447343233323032";
var sPhoton2 = "20001f000d47343432313031";
var sPhoton3 = "350043001347343338333633";

var sSlackAction = "led";
var sStockAction = "stockPrice";

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

app.get('/slack', function(req,res) {

	//TD Prototype #2
	console.log("slack");
	console.log(req.query);
	console.log(req.query.text);

	var _cmd, _val;
	if (req.query.text.indexOf(":")) {
		var msgArr = req.query.text.split(":");
		_cmd = msgArr[0];
		_val = msgArr[1];
	} else {
		_cmd = req.query.text;
	}

	//Send out posts
	_sPhoton = "";

	switch (_cmd) {
		case "td1":

			_sPhoton = sPhoton1; 
			break;
		case "td2":

			_sPhoton = sPhoton3;
			break;

		case "cat":
			_sPhoton = "";
			break;
	}

	var _url = "https://api.particle.io/v1/devices/" + _sPhoton + "/" + sSlackAction + "?access_token=e373cabcfaf640695f68f947d2070635c359cf0c";

	console.log(_url);

	request.post(
		_url,
		{ form: { args: _val }},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("RESPONSE SLACK:" + body);
			}
			console.log("RESPONSE SLACK:" + response.statusCode);
		}
	);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({status: "ok"}));
});

app.get('/dashboard.html', function(req,res) {
        res.sendfile("dashboard.html");
});

app.listen(80,function () {
        console.log("started on port 80");
});

//Get Stock Prices
function get_stock()
{
	_sPhoton = sPhoton1;
	_stock_url = "http://finance.google.com/finance/info?client=ig&q=NASDAQ:" + _stockArr;

	//GET ALL STOCK FROM GOOGLE
	request(_stock_url, function (error, response, body) {

		if (!error && response.statusCode == 200) {

			//Take off leading symbol
			_json = JSON.parse(body.substring(4, body.length - 1));

			var _stock_out = "";

			for (var i=0; i<4; i++)
			{
				//create string
				_price = _json[i]["l_cur"] - _json[i]["pcls_fix"];
				_price = (_price*10000) / _json[i]["pcls_fix"];

				if (_price > 255) { _price = 255;}
				if (_price < -255) { _price = -255;}

				console.log(">" + _json[i]["l_cur"] + ">" +  _json[i]["pcls_fix"]);
				console.log(arrSymbols[i] + " > " + _price.toFixed(0));

				//_stock_out = _price.toFixed(2) + "," + _stock_out;
				_stock_out = _stock_out + _price.toFixed(0).toString() + ",";
			}

			console.log(_stock_out);

			_url = "https://api.particle.io/v1/devices/" + _sPhoton + "/" + sStockAction + "?access_token=e373cabcfaf640695f68f947d2070635c359cf0c";

			//console.log(">" + _url);

			request.post(
				_url,
				{ form: { args: _stock_out }},
				function (error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log("RESPONSE STOCK:" + body);
					}
					console.log("RESPONSE STOCK:" + response.statusCode);
		
					//get it again
					setTimeout(get_stock, 5000);
				}
			);
		}
	});
}

//Get stocks
//get_stock();

