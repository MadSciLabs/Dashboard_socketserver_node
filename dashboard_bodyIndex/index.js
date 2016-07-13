var Kinect2 = require('kinect2'), //change to 'kinect2' in a project of your own
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	zlib = require('zlib');

var kinect = new Kinect2();

if(kinect.open()) {

	server.listen(8000);
	console.log('Server listening on port 8000');
	console.log('Point your browser to http://localhost:8000');

	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/dashboard_screen.html');
	});

	app.use(express.static(__dirname + '/public'));

	// compression is used as a factor to resize the image
	// the higher this number, the smaller the image
	// make sure that the width and height (1920 x 1080) are dividable by this number
	// also make sure the canvas size in the html matches the resized size
	var compression = 24;

	var origWidth = 1920;
	var origHeight = 1080;

	var origLength = 4 * origWidth * origHeight;
	var compressedWidth = origWidth / compression;
	var compressedHeight = origHeight / compression;
	var resizedLength = 4 * compressedWidth * compressedHeight;

	var singleLength = compressedWidth * compressedHeight;
	var singleIndex = 0;

	//we will send a smaller image (1 / 10th size) over the network
	//var resizedBuffer = new Buffer(resizedLength);
	var singleBuffer = new Buffer(singleLength);
	var compressing = false;

	console.log("Compressed Size : " + compressedWidth + "," + compressedHeight);

	function getClosestBodyIndex(bodies) {
		var closestZ = Number.MAX_VALUE;
		var closestBodyIndex = -1;
		for(var i = 0; i < bodies.length; i++) {
			if(bodies[i].tracked && bodies[i].joints[Kinect2.JointType.spineMid].cameraZ < closestZ) {
				closestZ = bodies[i].joints[Kinect2.JointType.spineMid].cameraZ;
				closestBodyIndex = i;
			}
		}
		return closestBodyIndex;
	}

	var trackedBodyIndex = -1;
	var emptyPixels = new Uint8Array(resizedLength);

	kinect.on('multiSourceFrame', function(frame){

			var closestBodyIndex = getClosestBodyIndex(frame.body.bodies);
			if(closestBodyIndex !== trackedBodyIndex) {
				if(closestBodyIndex > -1) {

					kinect.trackPixelsForBodyIndices([closestBodyIndex]);
				} else {

					kinect.trackPixelsForBodyIndices(false);

					//clear canvas
					processImageData(emptyPixels.buffer);
				}
			}
			else {
				if(closestBodyIndex > -1) {
					if(frame.bodyIndexColor.bodies[closestBodyIndex].buffer) {
						processImageData(frame.bodyIndexColor.bodies[closestBodyIndex].buffer);
					}
				}
			}
			trackedBodyIndex = closestBodyIndex;

	});

	function processImageData(data) {

		//console.log(width + " " + height + " " + data.length);

		if(!compressing) {
			compressing = true;
			singleIndex = 0;

			//data is HD bitmap image, which is a bit too heavy to handle in our browser
			//only send every x pixels over to the browser
			var y2 = 0;
			for(var y = 0; y < origHeight; y+=compression) {
				y2++;
				var x2 = 0;
				for(var x = 0; x < origWidth; x+=compression) {
					var i = 4 * (y * origWidth + x);
					var j = 4 * (y2 * compressedWidth + x2);

					//Convert to greyscale
					var _a = (data[i] + data[i+1] + data[i+2]) / 3;

					singleBuffer[singleIndex++] = _a;

					/*
					resizedBuffer[j] = _a; //data[i];
					resizedBuffer[j+1] = _a; //data[i+1];
					resizedBuffer[j+2] = _a; //data[i+2];
					resizedBuffer[j+3] = 255; //data[i+3];
					*/

					x2++;
				}
			}

			console.log("comp>" + singleBuffer.length);
			zlib.deflate(singleBuffer, function(err, result){
			//zlib.deflate(resizedBuffer, function(err, result){
				if(!err) {
					var buffer = result.toString('base64');

					console.log("expanded>" + buffer.length);

					io.sockets.sockets.forEach(function(socket){
	
						socket.volatile.emit('compGrayFrame', buffer);
					});
				}
				compressing = false;
			});
		}
	}

	//kinect.openColorReader();
	
	kinect.openMultiSourceReader({
		frameTypes: Kinect2.FrameType.bodyIndexColor | Kinect2.FrameType.body
	});

}
