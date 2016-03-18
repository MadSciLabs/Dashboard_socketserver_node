/*
		//Triangle Object
		function Tri(_x, _y, _color)
		{
			this.x = _x;
			this.y = _y;
			this.color = _color;
		}
*/
		function drawTriangle(_paper,_x,_y,_color,_opacity,_index)
		{
			var _p;
			var _offset = 0;

			if (_y % 2) {
				_offset = 2;
			}
			var _t = ((_x+ _offset ) % 4);
			var _rx = Math.floor(_x / 2);

			switch(_t) {
				case 0:
					_p = [
						"M", SQUARE_SIZE*_rx, SQUARE_SIZE*_y, 
						"L", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*(_y+1), 
						"L", SQUARE_SIZE*_rx, SQUARE_SIZE*(_y+1), 
						"L", SQUARE_SIZE*_rx, SQUARE_SIZE*_y
					];break;
				case 1:

					_p = [
						"M", SQUARE_SIZE*_rx, SQUARE_SIZE*_y, 
						"L", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*_y, 
						"L", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*(_y+1), 
						"L", SQUARE_SIZE*_rx, SQUARE_SIZE*_y
					];break;
				case 2:

					_p = [
						"M", SQUARE_SIZE*_rx, SQUARE_SIZE*_y, 
						"L", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*_y, 
						"L", SQUARE_SIZE*_rx, SQUARE_SIZE*(_y+1), 
						"L", SQUARE_SIZE*_rx, SQUARE_SIZE*_y
					];break;
				case 3:

					_p = [
						"M", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*_y, 
						"L", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*(_y+1), 
						"L", SQUARE_SIZE*_rx, SQUARE_SIZE*(_y+1), 
						"L", SQUARE_SIZE*(_rx+1), SQUARE_SIZE*_y
					];break;
			
			}

			var _t = _paper.path(_p).attr({
					"fill": _color,
					"stroke": "none",
					"opacity":_opacity
				})
				.mouseover(function() {

					this.attr({"opacity":1,"fill":getRandomColor()});
				})
				.mouseout(function() {

					if (imgLogoUsed.indexOf(parseInt(this.node.id)) >= 0) {
						this.attr({"opacity":1,"fill":"#fff"});
					} else {	
						this.attr("opacity",0);
					}
				})

			_t.node.id = _index;

			return _t;

		}

		function getRandomColor()
		{
			var _c;
			var _i = Math.floor(Math.random() * 4);

			return getColor(_i);
		}

		function getColor(_i)
		{
			var _c;

			switch(_i) {
				case 4:
					_c = "#fff";
					break;
				case 5:
					_c = "#ffff00";
					break;
				case 1:
					_c = "#e3e3e3";
					break;
				case 2:
					_c = "#b9b9b9";
					break;
				case 3:
					_c = "#7b7b7b";
					break;
				case 0:
					_c = "none";
					break;
			}	
			return _c;
		}

		function drawGrid(_paper, _ROWS, _COLS)
		{
			var line;
		
			var SIZE_W = SQUARE_SIZE * _COLS;
			var SIZE_H = SQUARE_SIZE * _ROWS;


			for (var i=0; i<_ROWS; i++)
			{
				line = _paper.path( ["M", 0, SQUARE_SIZE*i, "H", SIZE_W] );		
				line.attr("stroke", GRID_COLOR);
			}

			for (var i=-_COLS; i<2*_COLS; i++)
			{
				var line = _paper.path( ["M", SQUARE_SIZE*i, 0, "V", SIZE_H] );		
				line.attr("stroke", GRID_COLOR);

				if ((i%2) == 0) {

					var _xForward = _ROWS + i;
					var _xBack = -_ROWS + i;
					var _y = _ROWS;

					//LEFT to RIGHT
					if (i<_COLS) {
						var line = _paper.path( ["M", SQUARE_SIZE*i, 0, "L", _xForward*SQUARE_SIZE, _y*SQUARE_SIZE]);
						line.attr("stroke", GRID_COLOR);
					}

					//RIGHT TO LEFT		
					if (i > 0) {
						var line = _paper.path( ["M", SQUARE_SIZE*i, 0, "L", _xBack*SQUARE_SIZE, _y*SQUARE_SIZE]);
						line.attr("stroke", GRID_COLOR);

					}
				}
			}
		}


var getRandomMatrixIndex = function(_COLS,_ROWS) {

                        _x = Math.floor(Math.random()*_COLS*2);
                        _y = Math.floor(Math.random()*_ROWS);
                        _i = _y*COLS*2 + _x;

                        return _i;
}

var getMatrixIndex = function(_x, _y, _COLS) {

                        _i = _y*_COLS*2 + _x;

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