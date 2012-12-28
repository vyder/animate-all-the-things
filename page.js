window.onload = function() {

	var buildCircle = function(params) {
		var circleElement = document.createElement('div');
		circleElement.className = "thing circle";
		circleElement.style.width = "20%";
		circleElement.style.height = "20%";

		var circle = {
			element: circleElement
		};

		params.stage.element.appendChild(circle.element);
		circle.width = circle.element.offsetWidth;
		circle.height = circle.element.offsetHeight;
		circle.radius = circle.width/2;
		circle.maxOffset = (params.stage.height - circle.height);
		
		circle.topOffset = circle.maxOffset/2;
		circle.leftOffset = circle.maxOffset/2;

		circle.move = function() {
			circle.element.style.top = circle.topOffset + "px";
			circle.element.style.left = circle.leftOffset + "px";
		};
		circle.move();

		return circle;
	};

	var animations = [
		function straightBounce(params) {
			var circle = buildCircle(params);
			
			// Initial position
			circle.topOffset = 0;
			circle.move();

			var x = 1;

			circle.animate = function() {
				circle.topOffset += x; // speed
				circle.move();

				if(circle.topOffset === circle.maxOffset || circle.topOffset === 0) {
					x *= -1;
				}
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function diamond(params) {
			var circle = buildCircle(params);

			circle.topOffset = circle.maxOffset/2;
			circle.leftOffset = 0;
			circle.move();

			var normalSpeed = 1;

			var x = 0;
			var xSpeed = -normalSpeed;

			var y = 0;
			var ySpeed = normalSpeed;

			circle.animate = function() {
				circle.topOffset += xSpeed;
				circle.leftOffset += ySpeed;
				circle.move();

				x += xSpeed;
				y += ySpeed;

				if( (circle.topOffset === circle.maxOffset) || (circle.topOffset === 0) ) {
					xSpeed *= -1;
				}
				if( (circle.leftOffset === circle.maxOffset) || (circle.leftOffset === 0) ) {
					ySpeed *= -1;
				}
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function reflection(params) {
			var circle = buildCircle(params);

			circle.topOffset = circle.maxOffset/2;
			circle.leftOffset = 0;
			circle.move();

			var normalSpeed = 0.5;

			var x = 0;
			var xSpeed = -normalSpeed*2;

			var y = 0;
			var ySpeed = normalSpeed;

			circle.animate = function() {
				circle.topOffset += xSpeed;
				circle.leftOffset += ySpeed;
				circle.move();

				x += xSpeed;
				y += ySpeed;

				if( (circle.topOffset === circle.maxOffset) || (circle.topOffset === 0) ) {
					xSpeed *= -1;
				}
				if( (circle.leftOffset === circle.maxOffset) || (circle.leftOffset === 0) ) {
					ySpeed *= -1;
				}
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function diagonalRectangle(params) {
			var circle = buildCircle(params);

			circle.topOffset = circle.maxOffset/4;
			circle.leftOffset = 0;
			circle.move();

			var normalSpeed = 0.5;

			var x = 0;
			var xSpeed = -normalSpeed;

			var y = 0;
			var ySpeed = normalSpeed;

			circle.animate = function() {
				circle.topOffset += xSpeed;
				circle.leftOffset += ySpeed;
				circle.move();

				x += xSpeed;
				y += ySpeed;

				if( (circle.topOffset === circle.maxOffset) || (circle.topOffset === 0) ) {
					xSpeed *= -1;
				}
				if( (circle.leftOffset === circle.maxOffset) || (circle.leftOffset === 0) ) {
					ySpeed *= -1;
				}
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function sineBounce(params) {
			var circle = buildCircle(params);

			// Initial position
			circle.topOffset = 0;
			circle.move();

			var x = Math.PI/2;

			circle.animate = function() {
				// circle.maxOffset is maximum topOffset the circle can have to keep it within the bottom border of the stage
				// The sine is halved to make the full range (height of crest + depth of trough) of the circle's path equal the max topOffset
				// circle.maxOffset/2 is the offset on the path to make it oscillate within the stage
				circle.topOffset = circle.maxOffset * Math.sin(x)/2 + circle.maxOffset/2;
				circle.move();

				// when x = 0 	 	: circle is at the vertical middle of the stage
				// when x = PI/2 	: circle is at the bottom
				// when x = PI 	 	: circle is back at the vertical middle of the stage
				// when x = 3*PI/2 	: circle is at the top
				x += 0.05; // speed
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function circles(params) {
			var circle = buildCircle(params);

			var x = 0;

			circle.animate = function() {
				circle.topOffset = circle.maxOffset * Math.sin(x)/2 + circle.maxOffset/2;
				circle.leftOffset = circle.maxOffset * Math.cos(x)/2 + circle.maxOffset/2;
				circle.move();
				x += 0.02; // speed
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function sineReflection(params) {
			var circle = buildCircle(params);
			
			var normalSpeed = 0.02;

			var x = 0;
			var xSpeed = -normalSpeed*2;
			var y = 0;
			var ySpeed = -normalSpeed;

			circle.animate = function() {
				circle.topOffset = circle.maxOffset * Math.sin(x)/2 + circle.maxOffset/2;
				circle.leftOffset = circle.maxOffset * Math.cos(y)/2 + circle.maxOffset/2;
				circle.move();
				x += xSpeed;
				y += ySpeed;

				// if( Number(x.toFixed(2)) % Number((2*Math.PI).toFixed(2)) === 0 ) {
				// 	ySpeed *= -1;
				// }
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function blank(params) {
			
		}
	];

	var container = document.getElementById('container');

	var numAnimations = animations.length;
	for(var i = 0; i < numAnimations; i++) {
		var stageElement = document.createElement('div');
		stageElement.className = "stage";
		stageElement.innerHTML = "&nbsp;";

		var stage = {
			element: stageElement,
			width: 215, // hardcoded for now #TODO
			height: 215
		};

		container.appendChild(stage.element);
		animations[i]({
			stage: stage
		});
	}
};