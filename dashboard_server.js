
var http = require('http');
var url = require('url');
var fs = require('fs');
var request = require('request');
var express = require('express');
var server;

var app = express();
app.use(express.static('public'));
app.use(express.static('js'));

console.log("START");

app.get('/slack', function(req,res) {

	var _url = "https://api.particle.io/v1/devices/20001f000d47343432313031/led?access_token=e373cabcfaf640695f68f947d2070635c359cf0c";
	console.log("slack");
	console.log(req);

	request.post(
		_url,
		{ form: { args: 'b'}},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		}
	);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({a:1}));
});

app.get('/dashboard.html', function(req,res) {
        res.sendfile("dashboard.html");
});

app.listen(80,function () {
        console.log("started on port 80");
});

/*
server = http.createServer(function(req, res){

    // your normal server code
    var path = url.parse(req.url).pathname;
    switch (path){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
            res.end();
            break;
        //case '/test.html':
        case '/dashboard.html':
        //case '/stl.html':
            fs.readFile(__dirname + path, function(err, data){
                if (err){ 
                    return send404(res);
                }
                res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
                res.write(data, 'utf8');
                res.end();
            });
        break;
        default: send404(res);
    }
}),

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(80);
*/

/*
// use socket.io
var io = require('socket.io').listen(server);

var _client_light = 0;
var dirty = true;

//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){

    //send data to client
    setInterval(function(){
        socket.emit('client_light', {'val': Math.floor((Math.random() * 200) + 1)});
    }, 100);

    //recieve client data
    socket.on('rpi_light', function(data){

	dirty = true;
        //process.stdout.write(data.val + "\n");
	console.log("in " + data.val);
        _client_light = data.val; 

    });

    //SEND OUT
    setInterval(function(){
	if (true) { dirty = false;
        socket.emit('client_light', {'val': _client_light});
        }
    }, 10);

});

*/
