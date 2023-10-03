const areaLogoCover = document.querySelector(".home .area-logo-cover");
const mouseOn = document.querySelector(".home .area-logo .description");
mouseOn.addEventListener("mousemove", function (e) {
	const x = e.clientX;
	const y = e.clientY;
	const circle = areaLogoCover;

	setTimeout(() => {
		circle.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(0, 0, 0, 0) 10vw,
        #000000 10vw,
        #000000 100%        
    )`;
	}, 120);
});
