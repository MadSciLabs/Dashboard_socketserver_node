// -----------------------------------------------------------------------
// Inspired by KinectWorker-1.8.0.js from the 1.8 Microsoft SDK.
// -----------------------------------------------------------------------

(function(){

    importScripts('pako.inflate.min.js'); 

    var imageData;

    function init() {
        addEventListener('message', function (event) {
            switch (event.data.message) {
                case "setImageData":
                    imageData = event.data.imageData;
                    console.log("setImageData" + imageData.data.length);
                    break;
                case "processImageData":
                    processImageData(event.data.imageBuffer);
                    break;
            }
        });
    }

    function processImageData(compressedData) {
        var imageBuffer = pako.inflate(atob(compressedData));

        //var pixelArray = imageData.data;
        var newPixelData = new Uint8Array(imageBuffer);
        var imageDataSize = newPixelData.length; //imageData.data.length;

        for (var i = 0; i < imageDataSize; i++) {

            imageData.data[i] = newPixelData[i];

            /*
            imageData.data[4*i] = newPixelData[i];
            imageData.data[4*i+1] = newPixelData[i];
            imageData.data[4*i+2] = newPixelData[i];
            imageData.data[4*i+3] = 255; //newPixelData[i];
            */
        }

        //console.log("U>>>" + imageData.data.length + ">>" + imageDataSize);

        self.postMessage({ "message": "imageReady", "imageData": imageData });
    }

    init();
})();