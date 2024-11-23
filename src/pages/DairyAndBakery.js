import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const DairyAndBakery = () => {
	const [dnb, setDnb] = useState([]);

	const fetchDnb = async () => {
		try {
			const response = await axios.get("http://localhost:3000/DairyAndBakery");
			setDnb(response.data);
		} catch (error) {
			console.log("Error loading fruits ...");
		}
	};

	useEffect(() => {
		fetchDnb();
	}, []);

	return (
		<>
			<CustomNavbar />
			{dnb.map((item) => {
				return (
					<div>
						<ProductCard {...item} />
					</div>
				);
			})}
		</>
	);
};

export default DairyAndBakery;
