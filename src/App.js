import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
	PST,
	toPST,
	toSeconds,
	toMins,
	toHours,
	toDays,
} from "./utilities/parseDate";
import subtractISODates from "./utilities/subtractISODates";
import fetchEpisode from "./services/fetchEpisode";
import fetchJWTToken from "./services/fetchJWTToken";
import "./App.css";

// for the url as key what's the api query
const episodeMap = {
	bachelor: "70869?year=25",
	bachelorette: "71187?year=19",
	southpark: '75897?year=25',
	sp: '75897?year=25',
};
const dateMap = [toSeconds, toMins, toHours, toDays];

const App = () => {
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
		const episodeString = window.location.pathname.replace(/\W/g, "");

		if (episodeString) {
			setEpisode(episodeMap[episodeString]);
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
	}, [episode]);

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
			() => updateToday({ iso: new Date().toISOString(), pst: toPST(Date()) }),
			1000,
		);

		return () => clearInterval(intervalID);
	}, [nextAired, dateIndex, today]);

	return (
		<Router>
			<Switch>
				<Route exact path="/bachelor">
					<button className="episode" onClick={changeDate}>
						{nexpisode}
						<br />
						remaining...
					</button>
				</Route>
				<Route exact path="/bachelorette" onClick={changeDate}>
					<div className="episode">
						{nexpisode}
						<br />
						remaining...
					</div>
				</Route>
				<Route exact path="/sp">
					<button className="episode" onClick={changeDate}>
						{nexpisode}
						<br />
						remaining...
					</button>
				</Route>
				<Route exact path="/south-park">
					<button className="episode" onClick={changeDate}>
						{nexpisode}
						<br />
						remaining...
					</button>
				</Route>
				<Route exact path="/">
					<div className="episode">When is the next episode?</div>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
