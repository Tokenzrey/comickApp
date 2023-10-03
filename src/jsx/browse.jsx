import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { FullcardBrowse, FullcardSearch } from "./components/card";
import SearchBar from "./components/search";
import {
	groupAndSortManhwaByDate,
	getUniqueManhwa,
	sortingDate,
} from "./components/dataManage.js";
import { combineDataHistory } from "./dataManage.js";
import navbar from "../js/scrollUp";
import "../css/browse.css";
import "../css/sourceBrowse.css";
import "../css/settingMenu.css";

const Browse = () => {
	// Props untuk card
	const [dateCount, setDateCount] = useState(2);
	const [searchCommand, setSearchCommand] = useState("");
	const [manwhaList, setManhwaList] = useState([]);
	const [setting, setSetting] = useImmer({
		title: "browse",
		grouping: 3,
		collapse: true,
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

	useEffect(() => {
		const dataRes = combineDataHistory();
		const groupByFormats = ["DD-MM-YYYY", "YYYY-[W]WW", "YYYY-MM", "YYYY"];

		const groupByFormat = groupByFormats[setting.grouping - 1];

		const manhwaGroupedByDay = groupAndSortManhwaByDate(
			dataRes,
			groupByFormat,
			"hisDate"
		);

		if (setting.collapse) {
			const uniqueManhwaData = getUniqueManhwa(manhwaGroupedByDay);
			const uniqueManhwaDataArray = Object.values(uniqueManhwaData).flatMap(
				(group) => group
			);
			const dataList = sortingDate(uniqueManhwaDataArray, "hisDate", "asc");
			setManhwaList(dataList);
		} else {
			// Jika tidak ada collapse, manfaatkan hasil grouping langsung
			const uniqueManhwaDataArray = Object.values(manhwaGroupedByDay).flatMap(
				(group) => group
			);
			const dataList = sortingDate(uniqueManhwaDataArray, "hisDate", "asc");
			setManhwaList(dataList);
		}
	}, [setting.grouping, setting.collapse]);
	useEffect(() => {
		const update = () => {
			const imageRatio = 0.7;
			const savedRatio = 10;
			const additionalChapRatio = 12;
			const titleRatio = 0.1;
			const descriptionRatio = 14;
			const timeRatio = 140 / 11;
			const browseContent = document.querySelectorAll(
				".contents .innerContent .browse-content .browse-content-section"
			);
			browseContent.forEach((element) => {
				const card = element.querySelectorAll(".section-main .card");
				const section = element.querySelector(".section-main");
				const count = section.getAttribute("data-count");
				const innerWidth = window.innerWidth;
				const gap = (3 * innerWidth) / 100;
				const tittleSection = element.querySelector(".section-upper h1");
				tittleSection.style.fontSize = `${
					parseFloat(element.style.width) / savedRatio
				}px`;
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
		const handleResize = () => {
			const newDateCount = calculateDateCount();
			console.log(newDateCount);
			setDateCount(newDateCount);
		};

		handleResize(); // Call initially
		window.addEventListener("resize", handleResize);
		console.log("atas");

		navbar.init("browse");
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	useEffect(() => {
		// Kode JavaScript yang digabungkan

		const dropdown = document.querySelector(".top-section .search-browse");
		const dropdownMenu = document.querySelector(
			".top-section .search-browse-dropdown"
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

		const section_content = document.querySelectorAll(
			".browse .browse-content .browse-content-section"
		);

		section_content.forEach((SC) => {
			const sectionUpper = SC.querySelector(".section-upper");
			sectionUpper.addEventListener("click", function (event) {
				const clickedElement = event.target;
				// Check if the clicked element is not .sb-search, not .section-upper h1, and not .upper-right .sb-search
				if (
					!clickedElement.classList.contains("sb-search") &&
					!clickedElement.closest(".section-upper h1") &&
					!clickedElement.closest(".upper-right .sb-search")
				) {
					SC.classList.toggle("open");
				}
			});
		});
	}, []);
	useEffect(() => {
		const metaTag = document.querySelector('meta[name="data-content"]');
		if (metaTag) {
			metaTag.setAttribute("content", "browse");
		}
	}, [searchCommand]);

	return (
		<>
			<div id="browse" className="browse">
				<div id="browse-navbar" className="browse-navbar fixed is-maximized">
					<div className="top-section">
						<h1>Browse :</h1>

						<div className="search-browse" data-toggle="dropdown">
							<div className="source-browse">Asurascans</div>
							<i className="fa-solid fa-caret-down"></i>
						</div>
						<div className="search-browse-dropdown">
							<div className="search-browse-inner">
								<div className="upper-section">
									<h3>Search source :</h3>
									<SearchBar setSearchCommand={setSearchCommand} />
								</div>
								<div className="content-section">
									<div className="wajib-subsection">
										<div className="pin-subsection">
											<div className="left">
												<i className="fa-solid fa-earth-americas"></i>
												<h3>Global source</h3>
											</div>
											<div className="right">
												<i className="fa-solid fa-thumbtack"></i>
											</div>
										</div>
										<div className="nonPin-subsection">
											<div className="tittle-subsection">Recently used :</div>
											<div className="list-subsection">
												<ul>{/* Daftar item */}</ul>
											</div>
										</div>
									</div>
									<div className="custom-subsection">{/* Konten kustom */}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="browse-content">
					<div className="browse-content-section">
						<div className="section-upper">
							<h1>Search :</h1>
							<div className="upper-right">
								<SearchBar setSearchCommand={setSearchCommand} />
								<i className="fa-solid fa-caret-down"></i>
							</div>
						</div>
						<div className="section-main" data-count={dateCount}>
							<FullcardSearch
								searchCommand={searchCommand}
								uniqueManhwaData={manwhaList}
								dataKey={"hisDate"}
							/>
						</div>
					</div>
					<div className="browse-content-section">
						<div className="section-upper">
							<h1>Popular :</h1>
							<i className="fa-solid fa-caret-down"></i>
						</div>
						<div className="section-main" data-count={dateCount}>
							<FullcardBrowse
								uniqueManhwaData={manwhaList}
								dataKey={"hisDate"}
							/>
						</div>
					</div>
					<div className="browse-content-section">
						<div className="section-upper">
							<h1>Newest :</h1>
							<i className="fa-solid fa-caret-down"></i>
						</div>
						<div className="section-main" data-count={dateCount}>
							<FullcardBrowse
								uniqueManhwaData={manwhaList}
								dataKey={"hisDate"}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Browse;
