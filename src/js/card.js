// JavaScript
const card = document.querySelectorAll(".card");

const imageRatio = 0.7;
const savedRatio = 7;
const additionalChapRatio = 12;
const titleRatio = 0.1; // Update this value to adjust the title font size
const descriptionRatio = 14;
const timeRatio = 140 / 11;

const section = document.querySelector(".section-main");
const count = section.getAttribute("data-count");
function update() {
	const innerWidth = window.innerWidth;
	const gap = (3 * innerWidth) / 100;
	const tittleSection = document.querySelectorAll(".section-upper h1");
	tittleSection.forEach((element) => {
		element.style.fontSize = `${
			parseFloat(element.style.width) / savedRatio
		}px`;
	});
	card.forEach((element) => {
		let saved = element.querySelector(".saved");
		let additionalChap = element.querySelector(".additional-chapter");
		if (saved) {
			saved.style.fontSize = `${
				parseFloat(element.style.width) / savedRatio
			}px`;
		}
		if (additionalChap) {
			additionalChap.style.fontSize = `${
				parseFloat(element.style.width) / additionalChapRatio
			}px`;
		}
		element.style.width = `${
			(section.offsetWidth - (count - 1) * gap) / count
		}px`;

		element.querySelector(".card__header").style.height = `${
			parseFloat(element.style.width) / imageRatio
		}px`;

		element.querySelector(".card__body-tittle").style.fontSize = `${
			parseFloat(element.style.width) * titleRatio
		}px`;
		element.querySelector(
			".card__body .card__body-description"
		).style.fontSize = `${
			parseFloat(element.style.width) / descriptionRatio
		}px`;
		element.querySelector(".card__body-time").style.fontSize = `${
			parseFloat(element.style.width) / timeRatio
		}px`;
	});
}
update();
// Call update function when the DOM content is loaded and on window resize
document.addEventListener("DOMContentLoaded", update);
window.addEventListener("resize", update);
