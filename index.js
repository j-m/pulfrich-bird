window.addEventListener('load', function() {
	var canvas = document.getElementsByTagName("canvas")[0],
		context = canvas.getContext('2d');
	var grid = new Image();
	grid.src = 'mountainnew.png';

	var tree = new Image();
	tree.src = 'grass1.png';

	var tree2 = new Image();
	tree2.src = 'grass2.png';
	
	var bird = new Image();
	bird.src = 'bird.png';

	var tick = 0;
	class object{
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
	object.prototype.draw = function(){
		context.fillStyle = this.fill;
		var offset = (tick - this.t) * this.depth;
		if(this.x - offset + this.w < 0) 
			this.t = tick;
		context.drawImage(this.fill, this.x - offset, this.y, this.w, this.h);
	}
	class background extends object{
		constructor(fill, depth){
			super(fill,0,0,depth,0,0);
		}
	}
	background.prototype.draw = function(){
		var offset = (tick - this.t) * this.depth;
		if(this.x - offset + canvas.width < 0) 
			this.t = tick;
		
		var pattern = context.createPattern(this.fill, 'repeat');
		context.fillStyle = pattern;
		context.translate(-offset, 0);
		context.fillRect(0,0,canvas.width*2,canvas.height);
		context.translate(offset,0);
	}
	var objects = [];
	objects.push(new background(grid, 4));
	objects.push(new background(tree2, 3));
	objects.push(new background(tree, 2));
	
	var player = new object(bird, canvas.width/2 - 25, canvas.height/2 - 25, 0, 50, 50);
	
	(function draw() {
		requestAnimationFrame(draw);
		context.clearRect(0, 0, canvas.width, canvas.height);
		tick++;
		
		for(var item in objects)
			objects[item].draw();
		
		player.draw();
	})();
});