window.onload = function() {

	var createCircle = function( ) {
		var circleElement = document.createElement('div');
		circleElement.className = "thing circle";
		circleElement.style.width = "20%";
		circleElement.style.height = "20%";

		// Initial position
		circleElement.style.top = 0;
		circleElement.style.left = "40%";

		var circle = {
			element: circleElement
		};

		return circle;
	};

	var animations = [
		function animation1(params) {
			var circle = createCircle();
			params.stage.element.appendChild(circle.element);
			circle.width = circle.element.offsetWidth;
			circle.height = circle.element.offsetHeight;
			circle.radius = circle.width/2;

			circle.topOffset = 0;
			var x = 1;

			circle.animate = function() {
				circle.topOffset += x; // speed
				circle.element.style.top = circle.topOffset + "px";
				if(circle.topOffset === (stage.width - circle.width) || circle.topOffset === 0) {
					x *= -1;
				}
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function animation2(params) {
			var circle = createCircle();
			params.stage.element.appendChild(circle.element);
			circle.width = circle.element.offsetWidth;
			circle.height = circle.element.offsetHeight;
			circle.radius = circle.width/2;

			circle.topOffset = 0;
			var x = 0;

			circle.animate = function() {
				circle.topOffset = (stage.height - circle.height) * Math.sin(x)/2 + (stage.height/2 - circle.radius);
				x += 0.05; // speed
				circle.element.style.top = circle.topOffset + "px";
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function animation3(params) {
			var circle = createCircle();
			params.stage.element.appendChild(circle.element);
			circle.width = circle.element.offsetWidth;
			circle.height = circle.element.offsetHeight;
			circle.radius = circle.width/2;

			circle.topOffset = 0;
			circle.leftOffset = 0;
			var x = 0;

			circle.animate = function() {
				console.log(x);
				circle.topOffset = (stage.height - circle.height) * Math.sin(x)/2 + (stage.height/2 - circle.radius);
				circle.leftOffset = (stage.height - circle.height) * Math.cos(x)/2 + (stage.height/2 - circle.radius);
				x += 0.02; // speed
				circle.element.style.top = circle.topOffset + "px";
				circle.element.style.left = circle.leftOffset + "px";
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function animation4(params) {
			console.log("Animation 4");
		},
		function animation5(params) {
			console.log("Animation 5");
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