import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchCommand }) => {
	const location = useLocation();
	const history = useNavigate();

	const [isSearchOpen, setSearchOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		// Ketika lokasi (URL) berubah, periksa apakah ada parameter "q" di URL.
		const params = new URLSearchParams(location.search);
		const query = params.get("q");

		if (query) {
			// Jika ada parameter "q", atur nilai pencarian ke nilai dari parameter "q".
			setSearchValue(query);
			setSearchCommand(query);
		}
		else{
			setSearchValue("");
			setSearchCommand("");
		}
	}, [location, setSearchCommand]);

	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		const trimmedValue = searchValue.trim();
		if (trimmedValue !== "") {
			// Ubah URL dengan parameter "q" untuk menyimpan nilai pencarian.
			history(`?q=${encodeURIComponent(trimmedValue)}`);
			setSearchCommand(trimmedValue);
		} else {
			setSearchCommand("");
		}
		setSearchValue("");
	};

	const toggleSearchBox = () => {
		setSearchOpen(!isSearchOpen);
	};

	useEffect(() => {
		const closeSearchBox = (event) => {
			if (!event.target.closest(".sb-search")) {
				setSearchOpen(false);
			}
		};

		window.addEventListener("click", closeSearchBox);
		return () => {
			window.removeEventListener("click", closeSearchBox);
		};
	}, []);

	return (
		<div className={`sb-search ${isSearchOpen ? "sb-search-open" : ""}`}>
			<form onSubmit={handleSearchSubmit}>
				<input
					className="sb-search-input"
					type="search"
					placeholder="Search your comick . . ."
					value={searchValue}
					onChange={handleSearchInputChange}
				/>
				<input className="sb-search-submit" type="submit" value="" />
				<span className="sb-icon-search" onClick={toggleSearchBox}>
					<i className="fa fa-search"></i>
				</span>
			</form>
		</div>
	);
};

SearchBar.propTypes = {
	setSearchCommand: PropTypes.func.isRequired,
};

export default SearchBar;
