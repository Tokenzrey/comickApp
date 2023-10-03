var navbar = {
	duration: 300,
	delta: 50,
	transitioning: false,
	minimize: function () {
		if (this.el.classList.contains("is-maximized")) {
			this.transition();
		}
		this.el.classList.remove("is-maximized");
		this.el.classList.add("is-minimized");
	},
	maximize: function () {
		if (this.el.classList.contains("is-minimized")) {
			this.transition();
		}
		this.el.classList.remove("is-minimized");
		this.el.classList.add("is-maximized");
	},
	transition: function () {
		var _this = this;
		_this.el.querySelector(".top-section").style.visibility = "visible";

		_this.transitioning = true;
		_this.el.style.transition = "transform " + _this.duration + "ms";
		setTimeout(function () {
			_this.el.style.transition = "none";
			_this.transitioning = false;
			if (_this.el.classList.contains("is-minimized")) {
				_this.el.querySelector(".top-section").style.visibility = "hidden";
			}
		}, _this.duration);
	},
	handleLogoClick: function () {
		this.maximize();
	},
	init: function (id) {
		var _this = this;
		_this.el = document.querySelector("#" + id + "-navbar");
		var logo = document.querySelector("." + id + "-content");
		if (logo) {
			logo.addEventListener("click", function (e) {
				_this.handleLogoClick(e);
			});
		} else {
			console.log("tidak ada logo");
		}
		// Add the scrollHandler to the .contents element
		const scrollingElement = document.querySelector(".contents");
		const scrollHandler =
			(initialPos, handleScrollDown, handleScrollUp) => (event) => {
				event.target.scrollTop - initialPos > 0
					? handleScrollDown()
					: handleScrollUp();
				initialPos = event.target.scrollTop;
			};

		scrollingElement.onscroll = scrollHandler(
			0,
			() => _this.minimize(),
			() => _this.maximize()
		);
	},
};
// const metaTag = document.querySelector('meta[name="data-content"]');
// if (metaTag) {
// 	const contentValue = metaTag.getAttribute("content");
// 	if (contentValue == "history") {
// 		console.log("history");
// 		navbar.init("history");
// 	} else if (contentValue == "update") {
// 		navbar.init("update");
// 	} else if (contentValue == "library") {
// 		navbar.init("library");
// 	} else if (contentValue == "browse") {
// 		navbar.init("browse");
// 	}
// } else {
// 	console.log("Meta tag not found.");
// }
export default navbar;