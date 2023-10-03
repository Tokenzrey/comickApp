import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/settingMenu.css";

const Dropdown = ({ dataContent, setSetting, setting, settingKey }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [contentData, setContentData] = useState("");

	const handleDropdownItemClick = (dataValue) => {
		const updateSetting = (key, value) => {
			setSetting((draft) => {
				draft[key] = value;
			});
		};

		if (setting.tittle === "history") {
			if (settingKey === "grouping") {
				updateSetting("grouping", dataValue);
			}
		} else if (setting.tittle === "library") {
			if (settingKey === "grouping") {
				updateSetting("grouping", dataValue);
			} else if (settingKey === "sorting") {
				updateSetting("sorting", dataValue);
			}
		}
	};

	useEffect(() => {
		const dataMap = {
			history: {
				grouping: {
					1: "Daily",
					2: "Weekly",
					3: "Monthly",
					4: "Yearly",
				},
			},
			library: {
				grouping: {
					1: "All",
					2: "Reading",
					3: "Completed",
					4: "Plan",
					5: "Dropped",
				},
				sorting: {
					1: "Date added",
					2: "Last read",
					3: "Source",
					4: "Unread",
				},
			},
		};

		setContentData(dataMap[setting.tittle][settingKey][setting[settingKey]]);
	}, [setting.tittle, setting[settingKey], settingKey]);

	const handleDropdownButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const handleWindowClick = (e) => {
		const dropdownBtn = document.querySelector(
			`.setting-dropdown-page .content-section .submit-icon-${settingKey}`
		);
		const dropdownItems = document.querySelector(
			`.setting-dropdown-page .content-section .dropdown__items-${settingKey}`
		);

		if (!dropdownBtn.contains(e.target) && !dropdownItems.contains(e.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		const dropdownBtn = document.querySelector(
			`.setting-dropdown-page .content-section .submit-icon-${settingKey}`
		);

		dropdownBtn.addEventListener("click", handleDropdownButtonClick);
		window.addEventListener("click", handleWindowClick);

		return () => {
			dropdownBtn.removeEventListener("click", handleDropdownButtonClick);
			window.removeEventListener("click", handleWindowClick);
		};
	}, [isOpen, settingKey]);

	return (
		<div
			className={`submit-icon submit-icon-${settingKey} ${
				isOpen ? "active" : ""
			}`}
		>
			<button className="dropdown__button">
				<h1>{contentData}</h1>
				<i className="fa-solid fa-caret-down"></i>
			</button>
			<div
				className={`dropdown__items dropdown__items-${settingKey} ${
					isOpen ? "show" : ""
				}`}
			>
				{dataContent.map(([text, dataValue], index) => (
					<button
						key={index}
						className="dropdown__item"
						onClick={() => handleDropdownItemClick(dataValue)}
					>
						{text}
					</button>
				))}
			</div>
		</div>
	);
};

const SwitchOnOff = ({ setSetting, setting, settingKey }) => {
	// Handler untuk mengubah nilai setting.collapse berdasarkan posisi switch
	const handleSwitchChange = (event) => {
		const newValue = event.target.checked;
		setSetting((draft) => {
			draft[settingKey] = newValue;
		});
	};
	useEffect(() => {
		// Setting menu
		const handleSwitchButtonClick = () => {
			handleSwitchChange({ target: { checked: !setting[settingKey] } });
		};
		const switchBtn = document.querySelector(
			`.setting-switch-${settingKey} .switch`
		);

		switchBtn.addEventListener("click", handleSwitchButtonClick);

		// Membersihkan pendengar acara saat komponen dibongkar
		return () => {
			switchBtn.removeEventListener("click", handleSwitchButtonClick);
		};
	}, [setting, settingKey]);
	return (
		<div className={`setting-switch-${settingKey}`}>
			<div className="button-switch">
				<input
					type="checkbox"
					id={`switch-${settingKey}`}
					className="switch"
					checked={setting[settingKey]}
					onChange={handleSwitchChange}
				/>
				<label htmlFor={`switch-${settingKey}`} className="lbl-off"></label>
				<label htmlFor={`switch-${settingKey}`} className="lbl-on"></label>
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	dataContent: PropTypes.array.isRequired,
	setting: PropTypes.object.isRequired,
	setSetting: PropTypes.func.isRequired,
	settingKey: PropTypes.string.isRequired,
};
SwitchOnOff.propTypes = {
	setting: PropTypes.object.isRequired,
	setSetting: PropTypes.func.isRequired,
	settingKey: PropTypes.string.isRequired,
};
export { Dropdown, SwitchOnOff };
