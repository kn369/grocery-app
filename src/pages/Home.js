// import React from "react";
// import CustomNavbar from "../components/CustomNavbar";
// import Title from "../components/Title";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import CardComponent from "../components/CardComponent";

// const Home = () => {
// 	const [categories, setCategories] = useState([]);

// 	useEffect(() => {
// 		fetchCategories();
// 	}, []);

// 	const fetchCategories = async () => {
// 		try {
// 			const response = await axios.get("http://localhost:3000/categories");
// 			setCategories(response.data);
// 		} catch (error) {
// 			console.log("Error loading categories ...");
// 		}
// 	};
// 	return (
// 		<>
// 			<CustomNavbar />
// 			<Title />
// 			<div>
// 				<h1 style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
// 					Shop by Category
// 				</h1>
// 				<div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", margin: "1vw"}} >
// 					{categories.map((category) => {
// 						console.log(category);
// 						return (
// 							<div style={{maxWidth: "40vh", padding: "0.5vh"}}>
// 								<CardComponent {...category} />
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Home;

import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";

const Home = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
		const response = await axios.get("http://localhost:3000/categories");
		setCategories(response.data);
		} catch (error) {
		console.log("Error loading categories ...");
		}
	};

	return (
		<>
		<CustomNavbar />
		<Title />
		<div style={{ textAlign: "center", margin: "2rem 0" }}>
			<h1>Shop by Category</h1>
			<br />
			<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
				gap: "1.5rem",
				padding: "0 1rem",
			}}
			>
			{categories.map((category) => {
				return (
				<div key={category.id} style={{ maxWidth: "100%" }}>
					<CardComponent {...category} />
				</div>
				);
			})}
			</div>
		</div>
		</>
	);
};

export default Home;
