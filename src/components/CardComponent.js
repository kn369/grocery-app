import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
	const { id, category, description, link } = props;

	return (
		<Card>
			<Card.Body>
				<Link to={"/" + link}>
					<Card.Title>{category}</Card.Title>
				</Link>
				<Card.Text>{description}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default CardComponent;
