import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import moment from "moment";

const Card = ({ data, dataKey }) => {
	const {
		sourceName,
		sourceLink,
		chapterName,
		chapterLink,
		comickName,
		comickLink,
		comickImage,
		hisDate,
		updDate,
		libDate,
		saved,
	} = data;
	// Menentukan cara menghitung timeAgo berdasarkan dataKey
	let timeAgo;
	if (dataKey === "hisDate") {
		timeAgo =
			hisDate === "Unread"
				? hisDate
				: moment(hisDate, "DD-MM-YYYY HH:mm:ss").fromNow();
	} else if (dataKey === "updDate") {
		timeAgo = moment(updDate, "DD-MM-YYYY HH:mm:ss").fromNow();
	} else if (dataKey === "libDate") {
		timeAgo = moment(libDate, "DD-MM-YYYY HH:mm:ss").fromNow();
	}
	return (
		<div className="card">
			<a
				href={comickLink}
				target="_blank"
				rel="noopener noreferrer"
				className="card__header"
				style={{ backgroundImage: `url(${comickImage})` }}
			>
				{saved === 1 && (
					<div className="saved">
						<h3>SAVED</h3>
					</div>
				)}
			</a>

			<div className="card__body">
				<a
					className="card__body-tittle truncate"
					href={chapterLink}
					target="_blank"
					rel="noopener noreferrer"
				>
					{comickName}
				</a>
				<div className="card__body-description">
					<a
						className="card__body-chapter truncate"
						href={chapterLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						{chapterName}
					</a>
					<a
						className="card__body-source truncate"
						href={sourceLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						{sourceName}
					</a>
				</div>
				<div className="card__body-time truncate">{timeAgo}</div>
			</div>
		</div>
	);
};
Card.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string.isRequired,
		comick_id: PropTypes.string.isRequired,
		chapter_id: PropTypes.number.isRequired,
		sourceName: PropTypes.string.isRequired,
		sourceLink: PropTypes.string.isRequired,
		chapterName: PropTypes.string.isRequired,
		chapterLink: PropTypes.string.isRequired,
		comickName: PropTypes.string.isRequired,
		comickInisialName: PropTypes.string.isRequired,
		comickLink: PropTypes.string.isRequired,
		comickImage: PropTypes.string.isRequired,
		hisDate: PropTypes.string,
		libDate: PropTypes.string,
		updDate: PropTypes.string,
		saved: PropTypes.number.isRequired,
	}).isRequired,
	dataKey: PropTypes.string.isRequired,
};
export default Card;
