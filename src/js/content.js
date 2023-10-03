import scene from './scrollScene.js';
var content = document.querySelector(".contents");

function sceneOn() {
	scene.on("end", function (event) {
		console.log("end");
		if (event.scrollDirection === "FORWARD") {
			console.log("masuk");
			content.style.zIndex = 30;
			content.style.opacity = 1;
		} else if (event.scrollDirection === "REVERSE") {
			console.log("keluar");
			content.style.zIndex = 9;
			content.style.opacity = 0;
		}
	});
}

sceneOn(); // Call the function to set the event listener on the scene

window.addEventListener("load", sceneOn); // Use "load" instead of "onLoad"
window.addEventListener("resize", sceneOn);
