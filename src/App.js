import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toPST, PST } from "./utilities/parseDate";
import subtractISODates from "./utilities/subtractISODates";
import fetchEpisode from "./services/fetchEpisode";
import fetchJWTToken from "./services/fetchJWTToken";
import "./App.css";

// for the url as key what's the api query
const episodeMap = {
	bachelor: "70869?year=25",
	grey: "",
};

const App = () => {
	const [episode, setEpisode] = useState(null);
	const [nexpisode, updateNexpisode] = useState("¯\\_(ツ)_/¯");
	// currently we're not using this
	// eslint-disable-next-line no-unused-vars
	const [nextAired, updateNextAired] = useState({
		iso: new Date().toISOString(),
		pst: toPST(new Date()),
	});
	const [today, updateToday] = useState({
		iso: new Date().toISOString(),
		pst: toPST(new Date()),
	});

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
				console.log(episode);
				fetchEpisode(token.data.token, episode).then((episodeData) => {
					const nextAiredTVDBIso = new Date(
						`${episodeData.data.lastAired}${PST}`,
					).toISOString();
					updateNextAired({
						iso: nextAiredTVDBIso,
						pst: toPST(new Date(nextAiredTVDBIso)),
					});
				});
			});
		}
	}, [episode]);

	useEffect(() => {
		const remaining = subtractISODates(nextAired.iso, today.iso);

		if (remaining > 0) {
			updateNexpisode(`${remaining} mins`);
		}

		const intervalID = setInterval(
			() => updateToday({ iso: new Date().toISOString(), pst: toPST(Date()) }),
			1000,
		);

		return () => clearInterval(intervalID);
	}, [nextAired, today]);

	return (
		<Router>
			<Switch>
				<Route exact path="/bachelor">
					<div className="episode">
						{nexpisode}
						<br />
						remaining...
					</div>
				</Route>
				<Route exact path="/grey">
					<div className="episode">
						{nexpisode}
						<br />
						remaining...
					</div>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
