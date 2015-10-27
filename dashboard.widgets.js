
const LAB_STATE_WAIT = 0;
const LAB_STATE_IN = 1;
const LAB_STATE_OUT = 2;
const LAB_STATE_CLOSED = 3;

function widget_lab()
{

	this.context;
	this.canvas;
	
    	this.xa; this.ya;
    	this.wa; this.ha;

	this.x1b; this.y1b; this.y2b; this.y3b;
	this.wb; this.hb;

	this.animate_dest=0;
	this.animate_loc=0;
	this.animate_speed=20;

	this.state = LAB_STATE_WAIT;

	this.init = function(_name)
	{
		this.canvas = document.getElementById(_name);
    		this.context = this.canvas.getContext('2d');
    
		this.xa = UNIT_SIZE_WIDTH * .55;
    		this.ya = UNIT_SIZE_WIDTH * .49;
    		this.wa = UNIT_SIZE_WIDTH * .91;
    		this.ha = UNIT_SIZE_WIDTH * .34;

		this.x1b = UNIT_SIZE_WIDTH * 1.56;

		this.y1b = this.ya;
		this.y2b = UNIT_SIZE_WIDTH * .63;
		this.y3b = UNIT_SIZE_WIDTH * .77;

		this.wb = this.wa;
		this.hb = UNIT_SIZE_WIDTH * .06;

		//get travel distance needed for animating logo
		this.animate_dest = this.x1b - this.xa;

		console.log("dest>" + this.animate_dest);

		if (!this.context) {
               		return;
                }
	};

	this.update = function()
	{
		if (this.state == LAB_STATE_IN) {

			this.animate_loc += this.animate_speed;
		
			if (this.animate_loc > this.animate_dest) {
				this.animate_loc = this.animate_dest;
				this.state = LAB_STATE_CLOSED;
			}

		} else if (this.state == LAB_STATE_OUT) {

			this.animate_loc -= this.animate_speed;
			if (this.animate_loc < 0) {
				this.animate_loc = 0;
				this.state = LAB_STATE_WAIT;
			}
		}
	};

	this.draw = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    		this.context.fillStyle = "#ffffff";
    		this.context.fillRect(this.xa+this.animate_loc, this.ya, this.wa, this.ha);

    		this.context.fillStyle = "#00ff00";
    		this.context.fillRect(this.x1b-this.animate_loc,this.y1b,this.wb,this.hb);
    		this.context.fillRect(this.x1b-this.animate_loc,this.y2b,this.wb,this.hb);
    		this.context.fillRect(this.x1b-this.animate_loc,this.y3b,this.wb,this.hb);
	};
}


function widget_elevator()
{

	this.context;
	this.canvas;
	
    	this.e_y;
	this.e_x = [0,0,0];
    	this.e_width;
	this.e_height;

	this.e_target = [0,0,0];
	this.e_loc = [0,0,0];
	this.e_dir = [0,0,0];

	this.speed = 1;

	this.init = function(_name)
	{
		this.canvas = document.getElementById(_name);
    		this.context = this.canvas.getContext('2d');
    
		this.e_y = UNIT_SIZE_WIDTH * .37;
    		this.e_x[0] = UNIT_SIZE_WIDTH * .17;
    		this.e_x[1] = UNIT_SIZE_WIDTH * .43;
    		this.e_x[2] = UNIT_SIZE_WIDTH * .69;

		this.e_width = UNIT_SIZE_WIDTH * .14;
		this.e_height = UNIT_SIZE_HEIGHT - this.e_y;

		if (!this.context) {
               		return;
                }

		//Init location values
		for (i=0; i<3; i++) {
			this.e_loc[i] = Math.floor(Math.random() * (this.e_height-this.e_width)) + 1;
			this.setElevatorDest(i);
		}
	};

	this.setElevatorDest = function(_i)
	{
		var _dir = 1;

		this.e_target[_i] = Math.floor(Math.random() * (this.e_height-this.e_width)) + 1;

		if (this.e_target[i] < this.e_loc[_i])
		{
			_dir = -1;	
		}
	
		this.e_dir[i] = _dir;	
	};

	this.update = function()
	{ 
		for (i=0; i<3; i++)
		{
			if (this.e_target[i] == this.e_loc[i])
			{
				this.setElevatorDest(i);
			}
			else
			{
				this.e_loc[i] += this.e_dir[i];
			}
		}
	};

	this.draw = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    		this.context.fillStyle = "#ffffff";

    		this.context.fillRect(this.e_x[0], this.e_y, this.e_width, this.e_height);
    		this.context.fillRect(this.e_x[2], this.e_y, this.e_width, this.e_height);

		this.context.strokeStyle = "#ffffff"
		this.context.setLineDash([3,3]);

    		this.context.rect(this.e_x[1], this.e_y, this.e_width, this.e_height);
		this.context.stroke();

		//DRAW ELEVATORS
		for (i=0; i<3; i++) {

			this.context.fillStyle = "#00ff00";
			this.context.fillRect(this.e_x[i], this.e_y+this.e_loc[i], this.e_width, this.e_width);
		}
	};
}

function widget_food()
{

        this.context;
        this.canvas;

        this.a_x; this.b_x; this.b_y;

	this.a_w; this.a_h;
	this.space_h;
	
        this.animate_dest=0;
        this.animate_loc=0;
        this.animate_speed=10;

	this.offset = 0;
	this.offset_circle = 0;
	this.circle_dir = 1;

	this.total_space;

	this.speed = 1;

        this.init = function(_name)
        {
                this.canvas = document.getElementById(_name);
                this.context = this.canvas.getContext('2d');

                this.a_x = UNIT_SIZE_WIDTH * .6;
                this.b_x = UNIT_SIZE_WIDTH * 1.8;
                this.b_y = UNIT_SIZE_WIDTH * 1.1;

                this.a_w = UNIT_SIZE_WIDTH * .9;
                this.a_h = UNIT_SIZE_WIDTH * .14;
                this.space_h = UNIT_SIZE_WIDTH * .14;

		this.total_space = this.space_h + this.a_h;
		this.offset = -this.space_h - this.a_h;

        };

	this.update = function()
	{
		this.offset += this.speed;

		if (this.offset >= 0) {
			this.offset -= this.total_space;
		}

		this.offset_circle += this.circle_dir*this.speed;

		if (this.offset_circle <= 0) {
			this.offset_circle = 0;
			this.circle_dir = 1;
		} else if (this.offset_circle >= this.a_w) {
			this.offset_circle = this.a_w;
			this.circle_dir = -1;
		}
	}

	this.draw = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		//this.context.clearRect(0, 0, 150, 150);

		this.context.strokeStyle = "#ffffff"
		this.context.setLineDash([4,3]);
		this.context.beginPath();

		for (i=0; i<11; i++)
		{
			_y = i * (this.a_h + this.space_h) + this.offset;
    			this.context.rect(this.a_x, _y, this.a_w, this.a_h);
			this.context.stroke();
		}

		this.context.fillStyle = green1;
    		this.context.fillRect(this.b_x, this.b_y, this.a_w, this.a_h);
		this.context.stroke();
		this.context.closePath();
		
		this.context.beginPath();
		this.context.arc(this.b_x + this.offset_circle, this.b_y+.5*this.a_h, 1.5*this.a_h, 0, 2*Math.PI);
		this.context.stroke();

		this.context.closePath();

	}
}

function widget_music()
{

        this.context;
        this.canvas;

	this.center, this.line;
        this.r_1,this.r_2, this.r_3, this.r_4; 

	this.speed = .5;
	this.rotation = 0;

        this.init = function(_name)
        {

                this.canvas = document.getElementById(_name);
                this.context = this.canvas.getContext('2d');

		this.center = UNIT_SIZE_WIDTH*3 / 2;
		this.line = UNIT_SIZE_WIDTH * .14
                this.r_1 = UNIT_SIZE_WIDTH * .65;
                this.r_2 = this.r_1 + this.line;
                this.r_3 = this.r_1 + 2*this.line;
                this.r_4 = this.r_1 + 3*this.line;

		this.s_1 = this.line*8
		this.s_2 = this.line*5
		this.s_3 = this.line*8
		this.s_4 = this.line*5

        };

	this.update = function()
	{
		this.rotation += this.speed;

		if (this.rotation >= 360) {
			this.rotation -= 360;
		}
	}

	this.draw = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.translate(this.center, UNIT_SIZE_HEIGHT);

		this.context.rotate(this.rotation*Math.PI/180);
		this.context.lineWidth = this.line;
		this.context.strokeStyle = "#ffffff";

		this.context.beginPath();
		this.context.setLineDash([this.s_1,this.s_1]);
		this.context.arc(0,0, this.r_1, 0, 2*Math.PI);
		this.context.stroke();
		this.context.closePath();

		this.context.beginPath();
		this.context.setLineDash([this.s_3,this.s_3]);
		this.context.arc(0,0, this.r_3, 0, 2*Math.PI);
		this.context.stroke();
		this.context.closePath();

	
		this.context.rotate(-(2*this.rotation*Math.PI)/180);
		this.context.strokeStyle = green1;

		this.context.beginPath();
		this.context.setLineDash([this.s_2,this.s_2]);
		this.context.arc(0,0, this.r_2, 0, 2*Math.PI);
		this.context.stroke();
		this.context.closePath();

		this.context.beginPath();
		this.context.setLineDash([this.s_4,this.s_4]);
		this.context.arc(0,0, this.r_4, 0, 2*Math.PI);
		this.context.stroke();
		this.context.closePath();

		this.context.setTransform(1, 0, 0, 1, 0, 0);
	}

}

/*
function widget_sound()
{

        this.context;
        this.canvas;

	this.x1, this.y1, this.val;


        this.init = function(_name)
        {
                this.canvas = document.getElementById(_name);
                this.context = this.canvas.getContext('2d');
		this.context.font = "20px Helvetica Neue";
                
		this.x1 = UNIT_SIZE_WIDTH * .8;
                this.y1 = UNIT_SIZE_WIDTH * .1;
        };

	this.set = function(_val)
	{
		this.val = _val;
	}

	this.update = function()
	{}

	this.draw = function() {
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context(this.val,this.x1,this.y1);
	}
}
*/

function widget_stream()
{
        this.context;
        this.canvas;

	this.x1, this.y1, this.val;

        this.widget;



        this.init = function(_name)
        {
		this.widget = widgetsRef.child(_name);
                this.widget.set(0);

                this.canvas = document.getElementById(_name);
                this.context = this.canvas.getContext('2d');

		_font_size = Math.floor(UNIT_SIZE_WIDTH * .2);
		this.context.font = _font_size + "px Helvetica Neue";
               	this.context.fillStyle = "#ffffff";
 
		this.x1 = UNIT_SIZE_WIDTH * .75;
                this.y1 = UNIT_SIZE_WIDTH * .2;
		this.val = 0;

                this.widget.on('child_added', function(snapshot) {
                	var data = snapshot.val();
			_widgetTemp.set(data);
                });

        };

	this.set = function(_val)
	{
		this.val = _val;
	}

	this.update = function()
	{}

	this.draw = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillText(this.val,this.x1,this.y1);
	}
}

/*
function widget_temp()
{

        this.context;
        this.canvas;

	this.x1, this.y1, this.val;


        this.init = function(_name)
        {
                this.canvas = document.getElementById(_name);
                this.context = this.canvas.getContext('2d');
                
		this.x1 = UNIT_SIZE_WIDTH * .8;
                this.y1 = UNIT_SIZE_WIDTH * .1;
	
		this.context.font = "20px Helvetica Neue";
        };

	this.set = function(_val)
	{
		this.val = _val;
	}

	this.update = function()
	{}

	this.draw = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context(this.val,this.x1,this.y1);
	}
}
*/


