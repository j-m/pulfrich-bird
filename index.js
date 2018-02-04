window.addEventListener('load', function() {
	var canvas = document.getElementsByTagName("canvas")[0],
		context = canvas.getContext('2d');
		
	var imgs = [];
	function addImage(src){
		var tmp = new Image();
		tmp.src = src;
		imgs.push(tmp);
	}
	addImage('bird.png');			//0
	addImage('mountainnew.png');	//1
	addImage('grass2.png');			//2
	addImage('forest3.png');		//3	
	addImage('forest1.png');		//4
	addImage('floor.png');			//5
	addImage('rocks.png');			//6
	addImage('forest4.png');		//7
	addImage('totem1.png');			//8
	
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
		constructor(index, depth){
			super(imgs[index],0,0,depth,0,0);
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
	objects.push(new background(1, 4));		//mountain
	objects.push(new background(2, 3));		//grass
	objects.push(new background(7, 2.9));	//forest4
	objects.push(new background(3, 2.5));	//forest3
	objects.push(new background(6, 2.25));	//rocks
	objects.push(new background(5, 2));		//forest1
	objects.push(new background(4, 2));		//floor
	
	objects.push(new object(imgs[8], canvas.width, 0, 1, 59, canvas.height))
	
	var player = new object(imgs[0], canvas.width/2 - 25, canvas.height/2 - 25, 0, 50, 50);
	
	(function draw() {
		requestAnimationFrame(draw);
		context.clearRect(0, 0, canvas.width, canvas.height);
		tick++;
		
		for(var item in objects)
			objects[item].draw();
		
		player.draw();
	})();
});