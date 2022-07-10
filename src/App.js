import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShowWrapper from "./ShowWrapper";
import Home from "./Home";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path=":id" element={<ShowWrapper />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
