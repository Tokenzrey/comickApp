function buttonUp(input) {
	var valux = input.value.trim().length;
	var sbSearchSubmit = input.parentNode.querySelector(".sb-search-submit");

	if (valux !== 0) {
		sbSearchSubmit.style.zIndex = "99";
	} else {
		input.value = "";
		sbSearchSubmit.style.zIndex = "-999";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	var submitIcons = document.querySelectorAll(".sb-icon-search");
	var submitInputs = document.querySelectorAll(".sb-search-input");
	var searchBoxes = document.querySelectorAll(".sb-search");
	var isOpenArr = Array(submitIcons.length).fill(false);

	document.addEventListener("mouseup", function (event) {
		for (let i = 0; i < submitIcons.length; i++) {
			if (
				isOpenArr[i] &&
				event.target !== submitIcons[i] &&
				event.target !== submitInputs[i]
			) {
				submitInputs[i].value = "";
				submitInputs[i].parentNode.querySelector(
					".sb-search-submit"
				).style.zIndex = "-999";
				submitIcons[i].click();
				isOpenArr[i] = false;
			}
		}
	});

	for (let i = 0; i < submitIcons.length; i++) {
		submitIcons[i].addEventListener("mouseup", function (event) {
			event.stopPropagation();
		});

		searchBoxes[i].addEventListener("mouseup", function (event) {
			event.stopPropagation();
		});

		submitIcons[i].addEventListener("click", function () {
			if (!isOpenArr[i]) {
				searchBoxes[i].classList.add("sb-search-open");
				isOpenArr[i] = true;
			} else {
				searchBoxes[i].classList.remove("sb-search-open");
				isOpenArr[i] = false;
			}
		});
	}
});
