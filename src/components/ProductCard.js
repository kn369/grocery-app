import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ProductCard = (props) => {
	const {id, name, price } = props;
	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(0);
	const [cart, setCart] = useState([]);

	const fetchUser = async () => {
		if (localStorage.getItem("user") === null) {
			return;
		}
		const id = JSON.parse(localStorage.getItem("user")).id;
		const response = await axios.get(
			'http://localhost:3000/users/' + id
		);
		setUser(response.data);
		console.log(user)
	}

	const fetchCart = async () => {
		const temp = user.cart;
		if (temp === undefined) {
			setCart([]);
			
		}
		else {
			setCart(temp);
		}
	}

	useEffect(() => {
		fetchUser();
	}, []);

	useEffect(() => {
		fetchCart();
	}, [user]);

	const increase = () => {
		setQuantity(quantity + 1);
		localStorage.setItem(name, quantity + 1);
	}

	const decrease = () => {
		setQuantity(quantity - 1);
	}

	

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
