import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = (props) => {
	const { name, price } = props;
	const [quantity, setQuantity] = useState(0);

	const increase = () => {
		setQuantity(quantity + 1);
	};

	const decrease = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<Card style={{ display: "grid" }}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{"Rs " + price + "/-"}</Card.Text>
			</Card.Body>
			<div style={{ display: "flex", alignItems: "center" }}>
				<Button onClick={decrease}>-</Button>
				<p style={{ margin: "0 0.5rem" }}>{quantity}</p>
				<Button onClick={increase} style={{ marginRight: "0.5rem" }}>
					+
				</Button>
			</div>
		</Card>
	);
};

export default ProductCard;
