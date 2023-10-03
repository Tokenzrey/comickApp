// JavaScript (script.js)
const dropdown = document.querySelector(
	".history-content .section-upper .dropdown-icon"
);
const dropdownMenu = document.querySelector(
	".history-content .section-upper .dropdown-menu"
);
dropdown.addEventListener("click", function () {
	dropdown.classList.toggle("active");
	dropdownMenu.classList.toggle("show");
});
window.addEventListener("click", function (e) {
	if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
		dropdown.classList.remove("active");
		dropdownMenu.classList.remove("show");
	}
});
