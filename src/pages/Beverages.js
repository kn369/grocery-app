import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Beverages = () => {
	const [beverages, setBeverages] = useState([]);

	const fetchBeverages = async () => {
		try {
			const response = await axios.get("http://localhost:3000/Beverages");
			setBeverages(response.data);
		} catch (error) {
			console.log("Error loading fruits ...");
		}
	};

	useEffect(() => {
		fetchBeverages();
	}, []);

	return (
		<>
			<CustomNavbar />
			{beverages.map((beverage) => {
				return (
					<div>
						<ProductCard {...beverage} />
					</div>
				);
			})}
		</>
	);
};

export default Beverages;
