import moment from "moment";
import _ from "lodash";
// Group and sort data by date
function groupAndSortManhwaByDate(data, format, key) {
	const groupedData = _.groupBy(data, (item) => {
		const historyDate = moment(item[key], "DD-MM-YYYY HH:mm:ss");
		return historyDate.format(format);
	});

	// Sort each group by historydate in ascending order
	_.forEach(groupedData, (group) => {
		group.sort((a, b) => {
			const dateA = moment(a[key], "DD-MM-YYYY HH:mm:ss");
			const dateB = moment(b[key], "DD-MM-YYYY HH:mm:ss");
			return dateB - dateA; // Sort in ascending order
		});
	});

	return groupedData;
}
// Fungsi untuk menggabungkan data berdasarkan comick_id dan chapter_id
function sortingDate(dataList, key, setting) {
	dataList.sort((a, b) => {
		const dateA = moment(a[key], "DD-MM-YYYY HH:mm:ss");
		const dateB = moment(b[key], "DD-MM-YYYY HH:mm:ss");
		if (setting == "asc") {
			return dateB - dateA;
		} else if (key == "desc") {
			return dateA - dateB;
		}
	});
	return dataList;
}
// Get unique data
function getUniqueManhwa(data) {
	const uniqueData = {};

	_.forEach(data, (group, key) => {
		uniqueData[key] = _.uniqBy(group, (item) => {
			return `${item.comickName}-${item.sourceLink}-${item.comickLink}`;
		});
	});
	return uniqueData;
}

export { groupAndSortManhwaByDate, getUniqueManhwa, sortingDate };
//
