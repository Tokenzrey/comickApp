import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import moment from "moment";
import {Fullcard} from "./components/card";
import SearchBar from "./components/search";
import {
	sortingDate
} from "./components/dataManage.js";
import { combineDataLibrary } from "./dataManage.js";
import navbar from "../js/scrollUp";
import "../css/library.css";
import "../css/sourceBrowse.css";
import "../css/settingMenu.css";
import { Dropdown } from "./components/dropdown";
const Library = () => {
	//props untuk card
	const [dateCount, setDateCount] = useState(2);
	const [searchCommand, setSearchCommand] = useState("");
	const [manwhaList, setManhwaList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [setting, setSetting] = useImmer({
		tittle: "library",
		sorting: 1,
		grouping: 1,
	});
	const [key, setKey] = useState("");
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
				".contents .innerContent .library-content .section-main .card"
			);
			const imageRatio = 0.7;
			const savedRatio = 10;
			const additionalChapRatio = 12;
			const titleRatio = 0.1;
			const descriptionRatio = 14;
			const timeRatio = 140 / 11;

			const section = document.querySelector(
				".contents .innerContent .library-content .section-main"
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
		navbar.init("library");
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	useEffect(() => {
		const metaTag = document.querySelector('meta[name="data-content"]');
		if (metaTag) {
			metaTag.setAttribute("content", "library");
		}
	}, [searchCommand]);

	useEffect(() => {
		// Membuka setting dropdown
		const dropdown = document.querySelector(
			".contents .innerContent .library-navbar .dropdown-icon"
		);
		const dropdownMenu = document.querySelector(
			".contents .innerContent .library-navbar .dropdown-menu"
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
		const dataRes = combineDataLibrary();

		// Filter data berdasarkan grouping
		let groupedData = [];
		if (setting.grouping == 1) {
			// Tampilkan semua kategori
			groupedData = dataRes;
		} else if (setting.grouping == 2) {
			// Tampilkan data dengan status "Reading"
			groupedData = dataRes.filter((item) => item.status == "Reading");
		} else if (setting.grouping == 3) {
			// Tampilkan data dengan status "Completed"
			groupedData = dataRes.filter((item) => item.status == "Completed");
		} else if (setting.grouping == 4) {
			// Tampilkan data dengan status "Plan"
			groupedData = dataRes.filter((item) => item.status == "Plan");
		} else if (setting.grouping == 5) {
			// Tampilkan data dengan status "Dropped"
			groupedData = dataRes.filter((item) => item.status == "Dropped");
		}

		// Sorting berdasarkan hisDate
		if (setting.sorting == 1) {
			setKey("libDate");
			groupedData = sortingDate(groupedData, "libDate", "asc");
			
		} else if (setting.sorting == 2) {
			setKey("hisDate");
			// Sorting berdasarkan hisDate (Unread paling belakang)
			groupedData = groupedData.sort((a, b) => {
				if (a.hisDate == "Unread" && b.hisDate != "Unread") {
					return 1;
				} else if (a.hisDate != "Unread" && b.hisDate == "Unread") {
					return -1;
				}
				const dateA = moment(a.hisDate, "DD-MM-YYYY HH:mm:ss");
				const dateB = moment(b.hisDate, "DD-MM-YYYY HH:mm:ss");
				return dateB - dateA;
			});
		} else if (setting.sorting == 3) {
			setKey("libDate");
			// Sorting berdasarkan sourceName
			groupedData = groupedData.sort((a, b) => {
				return a.sourceName.localeCompare(b.sourceName);
			});
		} else if (setting.sorting == 4) {
			setKey("hisDate");
			// Sorting berdasarkan hisDate (Unread paling depan)
			groupedData = groupedData.sort((a, b) => {
				if (a.hisDate == "Unread" && b.hisDate != "Unread") {
					return -1;
				} else if (a.hisDate != "Unread" && b.hisDate == "Unread") {
					return 1;
				}
				const dateA = moment(a.hisDate, "DD-MM-YYYY HH:mm:ss");
				const dateB = moment(b.hisDate, "DD-MM-YYYY HH:mm:ss");
				return dateB - dateA;
			});
		}
		setManhwaList( groupedData);
	}, [setting.sorting, setting.grouping]);

	return (
		<>
			<div id="library" className="library">
				<div id="library-navbar" className="library-navbar fixed is-maximized">
					<div className="top-section">
						<h1>Library :</h1>
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
										<h3>Setting for library :</h3>
									</div>
									<div className="content-section">
										<ul className="setting-menu">
											<li>
												<div className="setitng-list-header">
													<h1>Sorting comick based on</h1>
												</div>
												<Dropdown
													dataContent={[
														[["Date added"], [1]],
														[["Last read"], [2]],
														[["Source"], [3]],
														[["Unread"], [4]],
													]}
													setSetting={setSetting}
													setting={setting}
													settingKey="sorting"
												/>
											</li>
											<li>
												<div className="setitng-list-header">
													<h1>Grouping comick based on</h1>
												</div>
												<Dropdown
													dataContent={[
														[["All"], [1]],
														[["Reading"], [2]],
														[["Completed"], [3]],
														[["Plan"], [4]],
														[["Dropped"], [5]],
													]}
													setSetting={setSetting}
													setting={setting}
													settingKey="grouping"
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
				<div className="library-content">
					<div className="library-content-section">
						<div className="section-main" data-count={dateCount}>
							{/* Menggunakan komponen Fullcardhistory */}
							<Fullcard
								searchCommand={searchCommand}
								uniqueManhwaData={manwhaList}
								dataKey={key}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Library;
