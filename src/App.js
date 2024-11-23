import React from "react";
import Home from "./pages/Home";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fruits from "./pages/Fruits";
import Vegetables from "./pages/Vegetables";
import DairyAndBakery from "./pages/DairyAndBakery";
import Stationary from "./pages/Stationary";
import Beverages from "./pages/Beverages";
import Profile from "./pages/Profile";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/dairyandbakery" element={<DairyAndBakery />} />
            <Route path="/stationary" element={<Stationary />} />
            <Route path="/beverages" element={<Beverages />} />
            <Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
