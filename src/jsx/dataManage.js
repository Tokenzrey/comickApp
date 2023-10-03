import { Comick, Chapter, Source, Library, History, Update } from "./data.js";

function combineDataHistory() {
	const combinedData = History.map((historyEntry, index) => {
		const { comick_id, chapter_id } = historyEntry;

		// Temukan data Comick yang sesuai dengan comick_id
		const comickData = Comick.find((comick) => comick.comick_id === comick_id);

		// Temukan data Chapter yang sesuai dengan comick_id dan chapter_id
		const chapterData = Chapter.find(
			(chapter) =>
				chapter.comick_id === comick_id && chapter.chapter_id === chapter_id
		);

		// Temukan data Source yang sesuai dengan source_id dari comickData
		const sourceData = Source.find(
			(source) => source.source_id === comickData.source_id
		);

		// Cek apakah comick_id ada dalam array objek Library
		const libraryEntry = Library.find((lib) => lib.comick_id === comick_id);
		const saved = libraryEntry ? 1 : 0;

		// Gabungkan semua data menjadi satu objek
		return {
			id: `${comick_id}-${chapter_id}-${index}`,
			comick_id,
			chapter_id,
			sourceName: sourceData.sourceName,
			sourceLink: sourceData.sourceLink,
			chapterName: chapterData.chapterName,
			chapterLink: chapterData.chapterLink,
			comickName: comickData.comickName,
			comickInisialName: comickData.comickInisialName,
			comickLink: comickData.comickLink,
			comickImage: comickData.comickImage,
			hisDate: historyEntry.hisDate,
			libDate: libraryEntry ? libraryEntry.libDate : "",
			saved,
		};
	});

	return combinedData;
}

// Fungsi untuk melengkapi data dalam array objek Library
function combineDataLibrary() {
	const combinedData = Library.map((libraryEntry, index) => {
		const { comick_id } = libraryEntry;

		// Temukan data Comick yang sesuai dengan comick_id
		const comickData = Comick.find((comick) => comick.comick_id === comick_id);

		// Temukan semua data History yang sesuai dengan comick_id
		const historyData = History.filter(
			(history) => history.comick_id === comick_id
		);

		// Temukan data History dengan hisDate terbaru
		let latestHistory = null;
		if (historyData.length > 0) {
			latestHistory = historyData.reduce((prev, current) =>
				prev.hisDate > current.hisDate ? prev : current
			);
		}

		// Ambil chapter_id, hisDate, dan chapterLink dari latestHistory
		const chapter_id = latestHistory ? latestHistory.chapter_id : 1;
		const hisDate = latestHistory ? latestHistory.hisDate : "Unread";
		const chapterData = Chapter.find(
			(chapter) =>
				chapter.comick_id === comick_id && chapter.chapter_id === chapter_id
		);

		// Ambil source_id dari comickData
		const source_id = comickData.source_id;
		const sourceData = Source.find((source) => source.source_id === source_id);

		// Gabungkan semua data menjadi satu objek
		return {
			id: `${comick_id}-${chapter_id}-${index}`,
			comick_id,
			chapter_id,
			sourceName: sourceData.sourceName,
			sourceLink: sourceData.sourceLink,
			chapterName: chapterData ? chapterData.chapterName : "Ch. 0", // Jika tidak ada data Chapter, set chapterName ke "Ch. 0"
			chapterLink: chapterData
				? chapterData.chapterLink
				: comickData.comickLink,
			comickName: comickData.comickName,
			comickInisialName: comickData.comickInisialName,
			comickLink: comickData.comickLink,
			comickImage: comickData.comickImage,
			hisDate,
			libDate: libraryEntry.libDate,
			status: libraryEntry.status,
			saved: 1, // Selalu set saved ke 1 karena ini berasal dari Library
		};
	});

	return combinedData;
}

// Fungsi untuk melengkapi data dalam array objek Update
function combineDataUpdate() {
	const combinedData = Update.map((updateEntry, index) => {
		const { comick_id, chapter_id } = updateEntry;

		// Temukan data Comick yang sesuai dengan comick_id
		const comickData = Comick.find((comick) => comick.comick_id === comick_id);

		// Temukan data Chapter yang sesuai dengan comick_id dan chapter_id
		const chapterData = Chapter.find(
			(chapter) =>
				chapter.comick_id === comick_id && chapter.chapter_id === chapter_id
		);

		// Temukan data Source yang sesuai dengan source_id dari comickData
		const sourceData = Source.find(
			(source) => source.source_id === comickData.source_id
		);

		// Gabungkan semua data menjadi satu objek
		return {
			id: `${comick_id}-${chapter_id}-${index}`,
			comick_id,
			chapter_id,
			sourceName: sourceData.sourceName,
			sourceLink: sourceData.sourceLink,
			chapterName: chapterData.chapterName,
			chapterLink: chapterData.chapterLink,
			comickName: comickData.comickName,
			comickInisialName: comickData.comickInisialName,
			comickLink: comickData.comickLink,
			comickImage: comickData.comickImage,
			updDate: updateEntry.updDate,
			saved: 1,
		};
	});

	return combinedData;
}
export { combineDataHistory, combineDataLibrary, combineDataUpdate };
