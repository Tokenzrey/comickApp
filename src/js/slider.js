const items = document.querySelectorAll(".loop-slider");
var numDivsActive;

const sliders = [
	{
		selector: ".item-1",
		speed: 3500,
	},
	{
		selector: ".item-2",
		speed: 3200,
	},
	{
		selector: ".item-3",
		speed: 3900,
	},
	{
		selector: ".item-4",
		speed: 3800,
	},
	{
		selector: ".item-5",
		speed: 3400,
	},
	{
		selector: ".item-6",
		speed: 4000,
	},
];

const swipers = [];
function calculateWidth() {
	const elementChange = document.querySelectorAll(".swiper-slide");
	const innerWidth = window.innerWidth;
	const innerHeight = window.innerHeight;
	let maximWidth = 300 * (numDivsActive - 1) + 100,
		a,
		n,
		hasil,
		elementNewWidth;
	if (maximWidth - 200 < innerWidth && innerWidth < maximWidth) {
		a = 10 / 2 ** (numDivsActive - 2);
	} else {
		a = 10 / 2 ** (numDivsActive - 1);
	}
	if (innerHeight < 200) {
		n = 1;
	} else if (innerHeight < 300) {
		n = 2;
	} else if (innerHeight < 400) {
		n = 3;
	} else {
		n = 4;
	}
	hasil = a + (n - 1) * 2.5;
	elementNewWidth = 100 / numDivsActive - hasil * 0.35 + "vw";
	elementChange.forEach((element) => {
		element.style.width = elementNewWidth;
	});
}
function setDivsActive() {
	const width = window.innerWidth;
	let temp;
	if (width <= 400) {
		temp = 2;
	} else if (width <= 700) {
		temp = 3;
	} else if (width <= 1000) {
		temp = 4;
	} else if (width <= 1300) {
		temp = 5;
	} else {
		temp = 6;
	}
	if (temp != numDivsActive) {
		numDivsActive = temp;
		items.forEach((item, index) => {
			if (index < numDivsActive) {
				item.style.display = "block";
				item.style.width = 100 / numDivsActive + "%";
			} else {
				item.style.display = "none";
			}
		});
		sliders.forEach((slider) => {
			const swiper = new Swiper(slider.selector, {
				direction: "vertical",
				loop: true,
				speed: slider.speed,
				spaceBetween: 0,
				slidesPerView: 2,
				autoplay: {
					disableOnInteraction: false,
					stopOnLastSlide: true,
					delay: 0,
				},
			});

			swipers.push(swiper);
		});
	}
}
function updateSpaceBetweenVH() {
	swipers.forEach((swiper) => {
		const viewportHeight = window.innerHeight;
		const spaceBetweenVH = (3 * viewportHeight) / 100;
		swiper.params.spaceBetween = spaceBetweenVH;
		swiper.update();
	});
}

setDivsActive();
updateSpaceBetweenVH();
calculateWidth();

// updateSlidesPerView();
window.addEventListener("resize", setDivsActive);
window.addEventListener("resize", updateSpaceBetweenVH);
window.addEventListener("resize", calculateWidth);
