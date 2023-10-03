import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { Fullcardupdate } from "./components/card";
import SearchBar from "./components/search";
import { combineDataUpdate } from "./dataManage.js";
import {
	groupAndSortManhwaByDate,
	getUniqueManhwa,
	sortingDate,
} from "./components/dataManage.js";
import navbar from "../js/scrollUp";
import "../css/update.css";
import "../css/sourceBrowse.css";
import "../css/settingMenu.css";
import { SwitchOnOff } from "./components/dropdown";

const Update = () => {
	//props untuk card
	const [dateCount, setDateCount] = useState(2);
	const [searchCommand, setSearchCommand] = useState("");
	const [manwhaList, setManhwaList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [setting, setSetting] = useImmer({
		tittle: "update",
		collapse: 1,
	});
	const calculateDateCount = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth <= 400) {
			return 2;
		} else if (windowWidth <= 800) {
			return 3;
		} else if (windowWidth <= 1200) {
			return 4;
		} else if (windowWidth <= 1800) {
			return 5;
		} else {
			return 6;
		}
	};
	const handleResize = () => {
		const newDateCount = calculateDateCount();
		console.log(newDateCount);
		setDateCount(newDateCount);
	};

	useEffect(() => {
		const update = () => {
			const card = document.querySelectorAll(
				".contents .innerContent .update-content .update-content-section .card"
			);
			const imageRatio = 0.7;
			const savedRatio = 10;
			const additionalChapRatio = 12;
			const titleRatio = 0.1;
			const descriptionRatio = 14;
			const timeRatio = 140 / 11;

			const section = document.querySelector(
				".contents .innerContent .update-content .update-content-section"
			);
			const count = section.getAttribute("data-count");

			const innerWidth = window.innerWidth;
			const gap = (3 * innerWidth) / 100;
			card.forEach((element) => {
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
			});
		};

		update();
		window.addEventListener("resize", update);
		console.log("bawah");
		return () => {
			window.removeEventListener("resize", update);
		};
	}, [dateCount, searchCommand, manwhaList]);
	useEffect(() => {
		handleResize(); // Call initially
		window.addEventListener("resize", handleResize);
		console.log("atas");
		navbar.init("update");
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	useEffect(() => {
		const metaTag = document.querySelector('meta[name="data-content"]');
		if (metaTag) {
			metaTag.setAttribute("content", "update");
		}
	}, [searchCommand]);

	useEffect(() => {
		// Membuka setting dropdown
		const dropdown = document.querySelector(
			".contents .innerContent .update-navbar .dropdown-icon"
		);
		const dropdownMenu = document.querySelector(
			".contents .innerContent .update-navbar .dropdown-menu"
		);

		const handleDropdownClick = () => {
			setIsOpen(!isOpen);
			dropdown.classList.toggle("active");
			dropdownMenu.classList.toggle("show");
		};

		dropdown.addEventListener("click", handleDropdownClick);

		const handleWindowClick = (e) => {
			if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
				setIsOpen(false);
				dropdown.classList.remove("active");
				dropdownMenu.classList.remove("show");
			}
		};

		window.addEventListener("click", handleWindowClick);

		return () => {
			// Membersihkan event listener saat komponen dilepas
			dropdown.removeEventListener("click", handleDropdownClick);
			window.removeEventListener("click", handleWindowClick);
		};
	}, [isOpen]);

	useEffect(() => {
		const dataRes = combineDataUpdate();
		const manhwaGroupedByDay = groupAndSortManhwaByDate(
			dataRes,
			"DD-MM-YYYY",
			"updDate"
		);

		if (setting.collapse) {
			const uniqueManhwaData = getUniqueManhwa(manhwaGroupedByDay);
			const uniqueManhwaDataArray = Object.values(uniqueManhwaData).flatMap(
				(group) => group
			);
			const dataList = sortingDate(uniqueManhwaDataArray, "updDate", "asc");
			setManhwaList(dataList);
		} else {
			// Jika tidak ada collapse, manfaatkan hasil grouping langsung
			const uniqueManhwaDataArray = Object.values(manhwaGroupedByDay).flatMap(
				(group) => group
			);
			const dataList = sortingDate(uniqueManhwaDataArray, "updDate", "asc");
			setManhwaList(dataList);
		}
	}, [setting.collapse]);

	return (
		<>
			<div id="update" className="update">
				<div id="update-navbar" className="update-navbar fixed is-maximized">
					<div className="top-section">
						<h1>UPDATE :</h1>
						<div className="top-subsection">
							<div
								className="setting-dropdown dropdown-icon"
								data-toggle="dropdown"
							>
								<div className="module-setting">
									<div id="sliders-setting">
										<span>
											<div className="box"></div>
										</span>
										<span>
											<div className="box"></div>
										</span>
										<span>
											<div className="box"></div>
										</span>
									</div>
								</div>
							</div>
							<div className="setting-dropdown-page dropdown-menu ">
								<div className="search-browse-inner">
									<div className="upper-section">
										<h3>Setting for update :</h3>
									</div>
									<div className="content-section">
										<ul className="setting-menu">
											<li>
												<div className="setitng-list-header">
													<h1>Collape same comick</h1>
												</div>
												<SwitchOnOff
													setSetting={setSetting}
													setting={setting}
													settingKey="collapse"
												/>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<SearchBar setSearchCommand={setSearchCommand} />
					</div>
				</div>
				<div className="update-content">
					<div className="update-content-section" data-count={dateCount}>
						<div className="section-main">
							<Fullcardupdate
								searchCommand={searchCommand}
								uniqueManhwaData={manwhaList}
								dataKey={"updDate"}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Update;
