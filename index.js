window.addEventListener('load', function() {
	var canvas = document.getElementsByTagName("canvas")[0],
		context = canvas.getContext('2d');
	var background = new Image();
	background.src = 'grid.png';
	background.onload = function() {
		background = context.createPattern(background, 'repeat');
	};
	var tick = 0;
	class box{
		constructor(fill, x, y, depth, w, h){
			this.fill = fill;
			this.x = x;
			this.y = y;
			this.depth = depth;
			this.w = w;
			this.h = h;
			this.t = tick;
		}
	}
	box.prototype.draw = function(){
		context.fillStyle = this.fill;
		var offset = (tick - this.t) * this.depth;
		if(this.x - offset < 0) 
			this.t = tick;
		context.fillRect(this.x - offset, this.y, this.w, this.h);
	}
	
	
	var objects = [];
	objects.push(new box("#814a2f", canvas.width,   0,2,120,canvas.height ));
	objects.push(new box("#814a2f", canvas.width*2, 0,2,120,canvas.height ));
	for(var item in objects)
		console.log(objects[item]);
	var player = new box("#dd0000", canvas.width/2 - 25, canvas.height/2 - 25, 0, 50, 50);
	(function repeatOften() {
		requestAnimationFrame(repeatOften);
		context.clearRect(0, 0, canvas.width, canvas.height);
		tick++;
		
		context.translate(-(tick%40)*4,0);
		context.fillStyle = background;
		context.fillRect(0,0,canvas.width+40*4,canvas.height);
		context.translate((tick%40)*4,0);
		
		for(var item in objects)
			objects[item].draw();
		
		player.draw();
	})();
});