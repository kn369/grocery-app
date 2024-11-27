import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductPage = (props) => {
	const [products, setProducts] = useState([]);
	const { link } = props;
	const [cart, setCart] = useState([]);
	const ref = useRef(true);

	const fetchCart = async () => {
		try {
			const userID = JSON.parse(localStorage.getItem("user")).id;
			if (userID) {
				const response = await axios.get(
					"http://localhost:3000/users/" + userID
				);
				if (response.data.cart) {
					setCart(response.data.cart);
					response.data.cart.forEach((item) => {
						localStorage.setItem(item.name, item.quantity);
					});
				}
				else {
					setCart([]);
				}
			}
		} catch (error) {
			console.log("Error fetching cart ...");
		}
	};

	const updateCart = () => {
		const temp = products.map((item) => {
			if (localStorage.getItem(item.name) !== null) {
				return {
					item: item.name,
					quantity: localStorage.getItem(item.name),
				};
			}
			return { item: item.name, quantity: 0 };
		});
		console.log(temp)
		setCart(temp);
	}

	const fetchProducts = async () => {
		try {
			const response = await axios.get("http://localhost:3000/" + link);
			setProducts(response.data);
		} catch (error) {
			console.log("Error loading fruits ...");
		}
	};

	const uploadCart = async () => {
		const userID = JSON.parse(localStorage.getItem("user")).id;
		try {
			const response = await axios.get("http://localhost:3000/users/" + userID);
			const user = response.data;
			const updatedCart = [...user.cart, ...cart ];
			const updatedUser = { ...user, cart: updatedCart };
			await axios.put(`http://localhost:3000/users/${userID}`, updatedUser);
		} catch (error) {
			console.log("Error uploading cart ...", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		fetchCart();
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current = false;
			return;
		}
		console.log(cart);
		uploadCart();
	},[cart]);

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
								<ProductCard {...product} key={product.id} update={updateCart} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ProductPage;
