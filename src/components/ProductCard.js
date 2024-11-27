import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { updateCart, fetchCart } from "./Cart";



const ProductCard = (props) => {
	const { id, name, price } = props;
	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(0);


	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			// Ensure cart is always an array
			if (!Array.isArray(user.cart)) {
				user.cart = [];
			}

			const itemIndex = user.cart.findIndex((item) => item.item === name);
			if (itemIndex === -1) {
				user.cart.push({ item: name, quantity: 0 });
				localStorage.setItem(name, 0);
			} else {
				setQuantity(user.cart[itemIndex].quantity);
			}
			setUser(user);
		}
	}, [name]);
 


	const increase = () => {
		setQuantity(quantity + 1);
		localStorage.setItem(name, quantity + 1);
		updateCart();
	};

	const decrease = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
			localStorage.setItem(name, quantity - 1);
			updateCart();
		}
	};

	return (
		<Card>
			<div style={{ display: "flex" }}>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{"Rs " + price + "/-"}</Card.Text>
				</Card.Body>
				<div style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
					<Button onClick={decrease}>-</Button>
					<p style={{ margin: "0 0.5rem" }}>{quantity}</p>
					<Button onClick={increase} style={{ marginRight: "0.5rem" }}>
						+
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ProductCard;
