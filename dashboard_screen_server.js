
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 3006 });

console.log("Server Started ...");

var ws;
var LOOP_TIMER = 200;

wss.on('connection', function connection(_ws) {

  ws = _ws;
  //sendFrame();
  console.log("On Connection");

  ws.on('message', function incoming(message) {
    console.log('forward: %s', message);

    //sendFrame();
    ws.send(message);

  });

  //ws.send('something');
});

function  clr() {

	return Math.floor(Math.random()*6)
}


function sendFrame()
{
	var _m = [];
	var _s = "";

	for (i=0; i<10; i++)
	{
		_t = [];
		for (j=0; j<20; j++)
		{
			//_t.push(clr())
			_s += clr();

		}
		//_m.push(_t);
	}

	//Send it out
	console.log(_s);
    //_ws.send(5, {binary:true, mask:true} );
    ws.send(_s);

    //var id = setTimeout(sendFrame,LOOP_TIMER);
}
