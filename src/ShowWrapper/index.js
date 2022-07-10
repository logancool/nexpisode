import { useState, useEffect } from "react";
import {
	PST,
	toPST,
	toSeconds,
	toMins,
	toHours,
	toDays,
} from "../utilities/parseDate";
import { useParams } from "react-router-dom";
import episodeMap from "../utilities/episodeMap";
import subtractISODates from "../utilities/subtractISODates";
import fetchEpisode from "../services/fetchEpisode";
import fetchJWTToken from "../services/fetchJWTToken";
import "./index.css";

const dateMap = [toSeconds, toMins, toHours, toDays];

const ShowWrapper = () => {
	// Get the userId param from the URL.
	let { id } = useParams();
	const [episode, setEpisode] = useState(null);
	const [nexpisode, updateNexpisode] = useState("¯\\_(ツ)_/¯");
	const [dateIndex, updateDateIndex] = useState(0);
	const [nextAired, updateNextAired] = useState({
		iso: new Date().toISOString(),
		pst: toPST(new Date()),
	});
	const [today, updateToday] = useState({
		iso: new Date().toISOString(),
		pst: toPST(new Date()),
	});

	const changeDate = () => {
		const nextDateIndex = (dateIndex + 1) % dateMap.length;
		updateDateIndex(nextDateIndex);
	};

	// we're using two useEffect since we only need to make our fetch call once
	// on request
	useEffect(() => {
		// set the episode

		if (id) {
			if (id.match(/\d/)) {
				setEpisode(id);
			} else {
				setEpisode(episodeMap[id]);
			}
		}

		if (episode) {
			fetchJWTToken().then((token) => {
				fetchEpisode(token.data.token, episode).then((episodeData) => {
					if (episodeData.data.nextAired) {
						const nextAiredTVDBIso = new Date(
							`${episodeData.data.nextAired}${PST}`,
						).toISOString();
						updateNextAired({
							iso: nextAiredTVDBIso,
							pst: toPST(new Date(nextAiredTVDBIso)),
						});
					}
				});
			});
		}
	}, [id, episode]);

	useEffect(() => {
		const UTCRemaining = subtractISODates(nextAired.iso, today.iso);

		if (UTCRemaining > 0) {
			const remaining = dateMap[dateIndex](UTCRemaining);
			updateNexpisode(
				`${remaining.amount.toLocaleString("en-US", {
					maximumFractionDigits: 0,
				})} ${remaining.unit}`,
			);
		}
		// cause a rerender every second
		const intervalID = setInterval(
			() =>
				updateToday({ iso: new Date().toISOString(), pst: toPST(new Date()) }),
			1000,
		);

		return () => clearInterval(intervalID);
	}, [nextAired, dateIndex, today]);

	return (
		<div className="episode">
			<div>
				Next Air Date:{" "}
				{nextAired.pst > today.pst ? nextAired.pst : "¯\\_(ツ)_/¯"}
			</div>
			<br />
			<button onClick={changeDate}>
				{nexpisode}
				<br />
				remaining...
			</button>
		</div>
	);
};

export default ShowWrapper;
