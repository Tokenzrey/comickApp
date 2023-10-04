import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/navbar.css";
import img1 from "../../assets/images/time-left.png"
import img2 from "../../assets/images/bookmark.png"
import img3 from "../../assets/images/refresh.png"
import img4 from "../../assets/images/browse.png"
import img5 from "../../assets/images/settings.png"
const Navigation = () => {
	const location = useLocation();
	// Fungsi untuk menangani klik pada tautan "ComickApp"
	useEffect(() => {
		const menu_btns = document.querySelectorAll(".container-hamburger");
		const mobile_menu = document.querySelector(".navigation-mobile");
		const navigation = document.querySelector(".navigation");

		const handleMenuButtonClick = () => {
			menu_btns.forEach((element) => {
				element.classList.toggle("is-active");
			});
			mobile_menu.classList.toggle("is-active");
		};

		const handleWindowClick = (e) => {
			if (!navigation.contains(e.target) && !mobile_menu.contains(e.target)) {
				menu_btns.forEach((element) => {
					element.classList.remove("is-active");
				});
				mobile_menu.classList.remove("is-active");
			}
		};

		menu_btns.forEach((menu_btn) => {
			menu_btn.addEventListener("click", handleMenuButtonClick);
		});

		window.addEventListener("click", handleWindowClick);

		return () => {
			menu_btns.forEach((menu_btn) => {
				menu_btn.removeEventListener("click", handleMenuButtonClick);
			});
			window.removeEventListener("click", handleWindowClick);
		};
	}, []);
	// Event handler untuk scroll ke atas saat ComickApp diklik
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth", // Efek scrolling halus
		});
	};
	return (
		<>
			<nav className="navigation">
				<div className="container-navbar">
					<div className="tittle-icon">
						<div onClick={scrollToTop}>ComickApp</div>
						{/* <a href="">ComickApp</a> */}
					</div>
					<ul className="nav-links">
						<li
							className={
								location.pathname === "/comickApp/library"
									? "nav-links active"
									: "nav-links"
							}
						>
							<Link to="/comickApp/library">Library</Link>
						</li>
						<li
							className={
								( location.pathname === "/comickApp" || location.pathname === "/comickApp/") ? "nav-links active" : "nav-links"
							}
						>
							<Link to="/comickApp">History</Link>
						</li>
						<li
							className={
								location.pathname === "/comickApp/update"
									? "nav-links active"
									: "nav-links"
							}
						>
							<Link to="/comickApp/update">Update</Link>
						</li>
						<li
							className={
								location.pathname === "/comickApp/browse"
									? "nav-links active"
									: "nav-links"
							}
						>
							<Link
								to="/comickApp/browse"
							>
								Browse
							</Link>
						</li>
					</ul>
					<div className="profile">
						<Link to="/comickApp/settings/profile" className="profile-icon"></Link>
					</div>
					<div className="container-hamburger">
						<div className="hamburger is-active"></div>
					</div>
				</div>
			</nav>
			<nav className="navigation-mobile">
				<div className="navigation-mobile-info">
					<div onClick={scrollToTop}>ComickApp</div>
					<div className="container-hamburger">
						<div className="hamburger is-active"></div>
					</div>
				</div>
				<div className="navigation-mobile-menu">
					<Link to="/comickApp">
						<img src={img1} alt="History" />
						History
					</Link>
					<Link to="/comickApp/library">
						<img src={img2} alt="Library" />
						Library
					</Link>
					<Link to="/comickApp/update">
						<img src={img3} alt="Update" />
						Update
					</Link>
					<Link to="/comickApp/browse">
						<img src={img4} alt="Browse" />
						Browse
					</Link>
					<Link to="/comickApp/settings">
						<img src={img5} alt="Setting" />
						Settings
					</Link>
				</div>
				<div className="navigation-mobile-footer"></div>
			</nav>
		</>
	);
};

export default Navigation;
