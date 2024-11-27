import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ProductCard = (props) => {
	const { id, name, price, update } = props;
	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(0);


	useEffect(() => {
		if (localStorage.getItem(name) !== null) {
			setQuantity(parseInt(localStorage.getItem(name)));
		}
	},[]);

	const increase = () => {
		setQuantity(quantity + 1);
		localStorage.setItem(name, quantity + 1);
		update();
	};

	const decrease = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
			localStorage.setItem(name, quantity - 1);
			update();
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
