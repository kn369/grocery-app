import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Vegetables = () => {
	const [vegetables, setVegetables] = useState([]);

	const fetchVegetables = async () => {
		try {
			const response = await axios.get("http://localhost:3000/Vegetables");
			setVegetables(response.data);
		} catch (error) {
			console.log("Error loading fruits ...");
		}
	};

	useEffect(() => {
		fetchVegetables();
	}, []);

	return (
		<>
			<CustomNavbar />
			{vegetables.map((vegetable) => {
				return (
					<div>
						<ProductCard {...vegetable} />
					</div>
				);
			})}
		</>
	);
};

export default Vegetables;
