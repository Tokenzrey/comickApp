import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import Fuse from "fuse.js";
import Card from "./fullCard";

const fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.4,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: ["comickName", "comickLink", "comickInisialName"],
};
const Fullcard = ({ searchCommand, uniqueManhwaData, dataKey }) => {
	const fuse = new Fuse(uniqueManhwaData, fuseOptions);
	const tempDataRes = fuse.search(searchCommand);
	return (
		<>
			{searchCommand === ""
				? uniqueManhwaData.map((item) => (
						<Card key={item.id} data={item} dataKey={dataKey} />
				  ))
				: tempDataRes.map((result) => (
						<Card key={result.item.id} data={result.item} dataKey={dataKey} />
				  ))}
		</>
	);
};
const Fullcardupdate = ({ searchCommand, uniqueManhwaData, dataKey }) => {
	// Filter dan kelompokkan data berdasarkan updDate
	const groupedData = {};
	uniqueManhwaData.forEach((item) => {
		const date = item.updDate.split(" ")[0]; // Ambil tanggal dari updDate (tanpa jam)
		if (!groupedData[date]) {
			groupedData[date] = [];
		}
		groupedData[date].push(item);
	});

	// Filter data berdasarkan pencarian
	const filteredData = searchCommand
		? Object.keys(groupedData).reduce((result, date) => {
				const matchingManhwa = groupedData[date].filter((item) =>
					item.comickName.toLowerCase().includes(searchCommand.toLowerCase())
				);
				if (matchingManhwa.length > 0) {
					result[date] = matchingManhwa;
				}
				return result;
		  }, {})
		: groupedData;

	// Render komponen berdasarkan grup tanggal
	return (
		<div>
			{Object.keys(filteredData).map((date) => (
				<div className="subSection-main" key={date}>
					<div className="subSection-main-upper">
						<h1>{date}</h1> {/* Tampilkan tanggal (hanya tanggal, bukan jam) */}
					</div>
					<div className="subSection-main-content">
						{filteredData[date].map((item) => (
							<Card key={item.id} data={item} dataKey={dataKey} />
						))}
					</div>
				</div>
			))}
		</div>
	);
};
const FullcardSearch = ({ searchCommand, uniqueManhwaData, dataKey }) => {
	const fuse = new Fuse(uniqueManhwaData, fuseOptions);
	const tempDataRes = fuse.search(searchCommand);
	return (
		<>
			{searchCommand === "" ? (
				<div className="search-content">
					<h1>Try to search you comick</h1>
				</div>
			) : (
				tempDataRes.map((result) => (
					<Card key={result.item.id} data={result.item} dataKey={dataKey} />
				))
			)}
		</>
	);
};
const FullcardBrowse = ({ uniqueManhwaData, dataKey }) => {
	return (
		<>
			{uniqueManhwaData.map((item) => (
				<Card key={item.id} data={item} dataKey={dataKey} />
			))}
		</>
	);
};
FullcardBrowse.propTypes = {
	uniqueManhwaData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired,
};
Fullcardupdate.propTypes = {
	searchCommand: PropTypes.string.isRequired,
	uniqueManhwaData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired,
};
FullcardSearch.propTypes = {
	searchCommand: PropTypes.string.isRequired,
	uniqueManhwaData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired,
};
Fullcard.propTypes = {
	searchCommand: PropTypes.string.isRequired,
	uniqueManhwaData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired,
};

export { Fullcard, Fullcardupdate, FullcardSearch, FullcardBrowse };
