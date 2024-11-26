import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = (props) => {
	const {id, name, price } = props;
	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(0);
	const [cart, setCart] = useState([]);

	const fetchUser = async () => {
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
		let index = cart.findIndex((item) => item.name === name);
		if (index === -1) {
			setCart([...cart, { name: name, price: price, quantity: 1 }]);
		}
		else {
			let temp = [...cart];
			temp[index].quantity += 1;
			setCart(temp);
		}
		console.log(cart);
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
