import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Stationary = () => {
	const [stationary, setStationary] = useState([]);

	const fetchStationary = async () => {
		try {
			const response = await axios.get("http://localhost:3000/Stationary");
			setStationary(response.data);
		} catch (error) {
			console.log("Error loading fruits ...");
		}
	};

	useEffect(() => {
		fetchStationary();
	}, []);

	return (
		<>
			<CustomNavbar />
			{stationary.map((stn) => {
				return (
					<div>
						<ProductCard {...stn} />
					</div>
				);
			})}
		</>
	);
};

export default Stationary;
