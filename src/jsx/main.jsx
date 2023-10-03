import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Menggunakan react-router-dom
import ScrollUp from "./components/scrollup";
import History from "./history";
import Library from "./library";
import Update from "./update";
import Navigation from "./components/navbar";
import Browse from "./browse";
ReactDOM.createRoot(document.querySelector(".innerContent")).render(
	<BrowserRouter>
		<Navigation/>
		<Routes>
			<Route path="/comickApp" element={<History />} />
			<Route path="/comickApp/library" element={<Library />} />
			<Route path="/comickApp/update" element={<Update />}/>
			<Route path="/comickApp/browse" element={<Browse />}/>
      {/* <Route path="/browse" element={<Browse />} />
      <Route path="/setting" element={<Setting />}>
        <Route path="/" element={<Setting />} />
        <Route path="/account" element={<Account />} />
      </Route> */}
		</Routes>
		<ScrollUp />
	</BrowserRouter>
);

