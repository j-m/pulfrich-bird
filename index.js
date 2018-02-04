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
	addImage('totem2.png');			//9
	addImage('totem3.png');			//10
	
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
		context.drawImage(this.fill, this.x - offset, this.y, this.w, this.h);
	}
	class background extends object{
		constructor(index, depth){
			super(imgs[index],0,0,depth,0,0);
		}
	}
	background.prototype.draw = function(){
		var offset = (tick - this.t) * this.depth;
		
		var pattern = context.createPattern(this.fill, 'repeat');
		context.fillStyle = pattern;
		context.translate(-offset, 0);
		context.fillRect(0,0,canvas.width*2,canvas.height);
		context.translate(offset,0);
		
		if(this.x - offset + canvas.width < 0) 
			this.t = tick;
	}
	var backgrounds = [];
	backgrounds.push(new background(1, 4));		//mountain
	backgrounds.push(new background(2, 3));		//grass
	backgrounds.push(new background(7, 2.9));	//forest4
	backgrounds.push(new background(3, 2.5));	//forest3
	backgrounds.push(new background(6, 2.25));	//rocks
	backgrounds.push(new background(5, 2));		//forest1
	backgrounds.push(new background(4, 2));		//floor
	
	var objects = [],
		player = new object(imgs[0], canvas.width/2 - 25, canvas.height/2 - 25, 0, 50, 50),
		velocity = 0,
		gravity = 0.5,
		jump = -10,
		alive = true;
	objects.push(new object(imgs[8], canvas.width, 0, 2.5, 59, canvas.height));
	canvas.onclick = function (event){
		velocity = jump;
	}
	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};
	(function draw() {
		requestAnimationFrame(draw);
		context.clearRect(0, 0, canvas.width, canvas.height);
		tick++;
		
		if(document.activeElement === canvas && alive){
			velocity += gravity;
			player.y += velocity;
		}
		for(var item in backgrounds)
			backgrounds[item].draw();
		for(var item in objects){
			var offset = (tick - objects[item].t) * objects[item].depth;
			if(objects[item].x - offset + objects[item].w < 0)
				delete objects[item];
			else{ 
				console.log(objects[item].x - offset);
				if(objects[item].x - offset - objects[item].w/2 <= canvas.width/2 && !objects[item].spawned && alive){
					objects.push(new object(imgs[8+ Math.floor(Math.random()*3)], canvas.width, 0, 2.5, 59, canvas.height))
					objects[item].spawned = true;
				}
				objects[item].draw();
			}
		}
		if(player.y + velocity < 0)
			velocity = gravity;
		if(player.y + player.h >= canvas.height-68)
			alive = false;
		player.draw();
	})();
}); 