import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductPage = (props) => {
	const [products, setProducts] = useState([]);
	const { link } = props;
	const fetchProducts = async () => {
		try {
			const response = await axios.get("http://localhost:3000/" + link);
			setProducts(response.data);
		} catch (error) {
			console.log("Error loading fruits ...");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<CustomNavbar />
			<div>
				<h1
					style={{ display: "flex", justifyContent: "center", margin: "1vw" }}
				>
					Fruits
				</h1>
				<div style={{margin: '1rem'}}>
					{products.map((product) => {
						return (
							<div style={{margin: "0.5rem"}}>
								<ProductCard {...product} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ProductPage;
