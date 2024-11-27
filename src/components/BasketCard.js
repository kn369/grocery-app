import React from "react";
import { Card } from "react-bootstrap";

const BasketCard = (props) => {
	const { item, quantity, price } = props;

	return (
		<>
			<Card style={{marginTop: "1rem"}}>
				<Card.Body
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					padding: "1rem",
					fontSize: "1rem",
					margin: "0.5rem"
					}}
				>
					<div>
						<Card.Title>{item}</Card.Title>
						<Card.Text>Quantity: {quantity}</Card.Text>
					</div>
					<Card.Text>{"Rs " + price + "/-"}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default BasketCard;