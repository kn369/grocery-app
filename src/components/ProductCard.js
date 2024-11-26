import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ProductCard = (props) => {
	const { name, price, image } = props;
	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(0);

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
	};

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
		<Card
			style={{
				margin: "10px",
				padding: "10px",
				boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Img src={image} style={{ width: "10rem", height: "10rem" }} />
				<Card.Text>{"Rs " + price + "/-"}</Card.Text>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Button onClick={decrease} style={{ marginRight: "10px" }}>
						-
					</Button>
					<p style={{ margin: "0 10px" }}>{quantity}</p>
					<Button onClick={increase}>+</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;
