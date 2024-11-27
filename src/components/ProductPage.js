import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { fetchCart } from "../components/Cart";

const ProductPage = (props) => {
	const [products, setProducts] = useState([]);
	const { link } = props;
	const [cart, setCart] = useState([]);

	const loadCartToLocalStorage = async () => {
		const cartData = await fetchCart();
		cartData.forEach((item) => {
			localStorage.setItem(item.name, item.quantity);
		});
		setCart(cartData);
	}; 
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

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			loadCartToLocalStorage();
		}
	}, []);

	return (
		<>
			<CustomNavbar />
			<div>
				<h1
					style={{ display: "flex", justifyContent: "center", margin: "1vw" }}
				>
					{link}
				</h1>
				<div style={{ margin: "1rem" }}>
					{products.map((product) => {
						return (
							<div style={{ margin: "0.5rem" }}>
								<ProductCard {...product} key={product.id} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ProductPage;
