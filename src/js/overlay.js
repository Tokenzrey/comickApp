var controller = new ScrollMagic.Controller();

// Menggunakan GSAP untuk mengatur delay dan offset pada setiap animasi
var overlayElements = document.querySelectorAll(
	".container-overlay .overlay span"
);
var tween = new TimelineMax();
tween.fromTo(
	".container-overlay",
	0.1,
	{ zIndex: 1 },
	{ zIndex: 11, immediateRender: false }
);
var innerHeight = window.innerHeight;
// Setiap overlay memiliki delay dan offset yang berbeda berdasarkan indexnya
overlayElements.forEach(function (overlay, index) {
	var delay = index * 0.1; // Delay diatur berdasarkan index, bisa disesuaikan sesuai keinginan
	var offset = index * (innerHeight / 6); // Offset diatur berdasarkan index, bisa disesuaikan sesuai keinginan
	tween.add(
		TweenMax.to(overlay, 1000, {
			width: "16.66666666666666667vw",
			ease: Linear.easeNone,
			delay: delay,
		}),
		offset
	);
});

// Buat scene dengan posisi trigger 10% di atas bawah elemen ".container-overlay"
// dan posisi start berada di atas elemen ".spacer" dan posisi end berada di 80% dari elemen ".spacer"
var scene = new ScrollMagic.SceneScene({
	triggerElement: ".spacer",
	triggerHook: "onEnter",
	duration: innerHeight - 5,
})
	.setTween(tween)
	.setPin(".container-overlay")
	.addTo(controller);
export default scene;
