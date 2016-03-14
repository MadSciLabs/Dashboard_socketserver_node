/*
 * LOGO
 */

var getRandomMatrixIndex = function() {

                        _x = Math.floor(Math.random()*COLS*2);
                        _y = Math.floor(Math.random()*ROWS);
                        _i = _y*COLS*2 + _x;

                        return _i;
}

var getMatrixIndex = function(_x, _y) {

                        _i = _y*COLS*2 + _x;

                        return _i;
}

function MultiDimensionalArray(iRows, iCols) {

        var i;
        var j;
        var table = new Array(iRows);

        for (i = 0; i < iRows; i++) {

                table[i] = new Array(iCols);

                for (j = 0; j < iCols; j++) {
               		table[i][j] = 0;
		}
        }
	return (table);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function setLogoArray() {

	imgLogoArray = [];
	imgLogoUsed = [];

	//Create the single index array of this. This will be replaced by a tool to do this offline
	for (i=0; i<ROWS; i++) {
		for (j=0; j<COLS*2; j++) {

			if (imgLogo[i][j] == 1) {
			//Get the single index for this in the Matrix
			_i = getMatrixIndex(j,i);

			//Push the single value to the img logo array
			imgLogoArray.push(_i);
			}
		}
	}

	//Randomize the imgLogoArray
	shuffle(imgLogoArray);
}

var imgLogo = MultiDimensionalArray(7,24);
var imgLogoArray= new Array();
var imgLogoUsed = new Array();

imgLogo[4] = [0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0];
imgLogo[5] = [0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0];


