define([
	"funcs",
	"eva",
	"jquery",
	"classes/GameObject",
	"classes/Vector/Vector",
	"classes/Vector/GravityVector",
	"classes/Vector/FadeVector",
	"classes/Hitbox/Hitbox",
	"classes/Hitbox/Circle",
	"classes/Hitbox/Line",
	"classes/Robot"
], function(f, Events, $, GameObject, Vector, GravityVector, FadeVector, Hitbox, Circle, Line, Robot) {
	"use strict";

	var MainApp = f.CreateClass("MainApp", {}, Events);

	MainApp.prototype.init = function(params) {
		params = params || {};
		for (var key in params) {
			this[key] = params[key];
		}

		this.initCanvas();

		this.Hitbox = Hitbox;
		this.Circle = Circle;
		this.Line = Line;
		this.GameObject = GameObject;
		this.FadeVector = FadeVector;
		this.GravityVector = GravityVector;

		this.red = new GameObject();
		this.red.color = "red";
		this.red.x = 100;
		this.redVector = new Vector();
		this.red.vectorManager.add(this.redVector);
		//this.red.vectorManager.add(new GravityVector());

		this.blue = new GameObject();
		this.blue.color = "blue";

		this.blue.x = 100;
		this.blue.y = 100;

		this.Robot = Robot;
		this.robot = new Robot();
		this.robot.x = 300;
		this.robot.y = 300;

		this.step = 4;

		var circle;

		/*
		circle = new Circle();
		circle.setRadius(this.red.r/2);
		this.redHitbox.addFigure(circle);
		*/

		circle = new Circle();
		circle.setRadius(20);
		this.blue.hitbox.addFigure(circle);


		var line;

		var width = 30;
		// top
		line = new Line();
		line.setStartPoint({x: -width/2, y: -width/2});
		line.setEndPoint({x: width/2, y: -width/2});
		this.red.hitbox.addFigure(line);
		// bottom
		line = new Line();
		line.setStartPoint({x: -width/2, y: width/2});
		line.setEndPoint({x: width/2, y: width/2});
		this.red.hitbox.addFigure(line);
		// left
		line = new Line();
		line.setStartPoint({x: -width/2, y: width/2});
		line.setEndPoint({x: -width/2, y: -width/2});
		this.red.hitbox.addFigure(line);
		// right
		line = new Line();
		line.setStartPoint({x: width/2, y: width/2});
		line.setEndPoint({x: width/2, y: -width/2});
		this.red.hitbox.addFigure(line);

		/*
		// top
		line = new Line();
		line.setStartPoint({x: -this.blue.r/2, y: -this.blue.r/2});
		line.setEndPoint({x: this.blue.r/2, y: -this.blue.r/2});
		this.blueHitbox.addFigure(line);
		// bottom
		line = new Line();
		line.setStartPoint({x: -this.blue.r/2, y: this.blue.r/2});
		line.setEndPoint({x: this.blue.r/2, y: this.blue.r/2});
		this.blueHitbox.addFigure(line);
		// left
		line = new Line();
		line.setStartPoint({x: -this.blue.r/2, y: this.blue.r/2});
		line.setEndPoint({x: -this.blue.r/2, y: -this.blue.r/2});
		this.blueHitbox.addFigure(line);
		// right
		line = new Line();
		line.setStartPoint({x: this.blue.r/2, y: this.blue.r/2});
		line.setEndPoint({x: this.blue.r/2, y: -this.blue.r/2});
		this.blueHitbox.addFigure(line);
		*/

		this.initControls();
		this.initLoop();

	};

	MainApp.prototype.initLoop = function() {
		this.fps = 60;
		this.frameTime = 1000 / this.fps;
		this.lastTime = Date.now() - this.frameTime;
		this.loop();
	};

	MainApp.prototype.loop = function() {
		var time = Date.now();
		var coeff = (time - this.lastTime) / this.frameTime;
		this.lastTime = time;

		this.frame(coeff);
		requestAnimationFrame(this.loop.bind(this), this.canvas);
	};

	MainApp.prototype.frame = function(timeCoeff) {
		this.canvas.width += 0;

		this.ctx.fillStyle = "#454545";
		this.ctx.fillRect(0, 0, this.size.width, this.size.height);

		var vector = this.redVector;
		vector.x = 0;
		vector.y = 0;
		var step = this.step;

		if ( this.keyCodes[37] ) {
			vector.x = -step;
		}
		if ( this.keyCodes[38] ) {
			vector.y = -step;
		}
		if ( this.keyCodes[39] ) {
			vector.x = step;
		}
		if ( this.keyCodes[40] ) {
			vector.y = step;
		}

		this.red.hitbox.clearVector();
		if ( this.red.hitbox.check(this.blue.hitbox) ) {
			this.red.hitbox.updateVector(this.blue.hitbox);
			//console.log("oops");
		}

		this.red.frame(timeCoeff);
		this.blue.frame(timeCoeff);

		this.robot.draw(this.ctx);
		this.red.drawHitbox(this.ctx);
		this.blue.drawHitbox(this.ctx);
		this.red.drawVector(this.ctx);
	};

	MainApp.prototype.onResize = function() {
		var windSize = f.getWindowSize();
		this.size = windSize;
		this.canvas.width = windSize.width;
		this.canvas.height = windSize.height;
	};

	MainApp.prototype.initCanvas = function() {
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.onResize();

		var windSize = f.getWindowSize();
		this.size = windSize;
		this.canvas.width = windSize.width;
		this.canvas.height = windSize.height;

		$(window).on("resize", this.onResize.bind(this));
	};

	MainApp.prototype.initTestFadeVector = function() {
		var vector = new FadeVector();
		vector.setBaseVector({
			x: 100,
			y: 100
		});

		vector.setManager(this.red.vectorManager);
		vector.setFrameCount(10);

		this.fadeVector = vector;
	};

	MainApp.prototype.testHitbox = function() {
		var HitboxRed = new Hitbox();
		var HitboxBlue = new Hitbox();
		var circle = new Circle();

		circle.setRadius(15);
		circle.setOffset({x: 0, y: 0});

		HitboxRed.addFigure(circle);
		HitboxBlue.addFigure(circle);

		HitboxBlue.x = 30;

		this.HitboxRed = HitboxRed;
		this.HitboxBlue = HitboxBlue;

		var res = HitboxRed.check(HitboxBlue);
		console.log(res);
	};

	MainApp.prototype.testLines = function() {
		var l = new app.Line();
		l.setStartPoint({x: -10, y: 0});
		l.setEndPoint({x: 10, y: 0});

		var l2 = new app.Line();
		l2.setStartPoint({ x: 0, y: -10 });
		l2.setEndPoint({ x: 2, y: -2 });

		console.log(l.getIntersection(l2));
	};

	MainApp.prototype.initControls = function() {
		this.keyCodes = {};

		$(window).on("keydown", function(e) {
			this.keyCodes[e.keyCode] = true;
			//this.step += 0.5;
		}.bind(this));

		$(window).on("keyup", function(e) {
			delete this.keyCodes[e.keyCode];

			if ( Object.keys(this.keyCodes).length === 0 ) {
				//this.step = 3;
			}
		}.bind(this));
	};

	return MainApp;
});
