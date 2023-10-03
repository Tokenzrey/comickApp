window.onload = function () {
	const menu_btns = document.querySelectorAll(".container-hamburger");
	const mobile_menu = document.querySelector(".navigation-mobile");
	const navigation = document.querySelector(".navigation");

	menu_btns.forEach((menu_btn) => {
		menu_btn.addEventListener("click", function () {
			menu_btns.forEach((element) => {
				element.classList.toggle("is-active");
			});
			mobile_menu.classList.toggle("is-active");
		});
	});

	window.addEventListener("click", function (e) {
		if (!navigation.contains(e.target) && !mobile_menu.contains(e.target)) {
			menu_btns.forEach((element) => {
				element.classList.remove("is-active");
			});
			mobile_menu.classList.remove("is-active");
		}
	});
};
