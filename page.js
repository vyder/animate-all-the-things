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

			circle.topOffset = 0;

			circle.animate = function() {
				if(circle.topOffset < (215 - 45)) {
					circle.topOffset += 1;
					circle.element.style.top = circle.topOffset + "px";
				} else {
					if(circle.animateInterval) {
						clearInterval(circle.animateInterval);
					}
				}
			};
			circle.animateInterval = setInterval(circle.animate, 5);
		},
		function animation2(params) {
			console.log("Animation 2");
		},
		function animation3(params) {
			console.log("Animation 3");
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
			width: stageElement.offsetWidth,
			height: stageElement.offsetHeight
		};

		container.appendChild(stage.element);
		animations[i]({
			stage: stage
		});
	}
};