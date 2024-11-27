import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
	const { id, category, description, link } = props;

	return (
		<Card
		style={{
			borderRadius: "10px",
			boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
			overflow: "hidden",
			transition: "transform 0.3s ease, box-shadow 0.3s ease",
			cursor: "pointer",
			display: "flex",
			flexDirection: "column",
			height: "100%", // Ensure the card takes up all available space
		}}
		className="category-card"
		>
		<Card.Body
			style={{
			padding: "1.5rem",
			flex: "1", // Ensures the body stretches to take the remaining space
			display: "flex",
			flexDirection: "column",
			// justifyContent: "space-between", // Adds space between title and description
			}}
		>
			<Link to={"/" + link} style={{ textDecoration: "none" }}>
			<Card.Title
				style={{
				fontSize: "1.5rem",
				fontWeight: "bold",
				textAlign: "center",
				color: "#007bff",
				}}
			>
				{category}
			</Card.Title>
			</Link>
			<Card.Text
			style={{
				fontSize: "1rem",
				color: "#555",
				textAlign: "justify",
				marginTop: "0.5rem",
			}}
			>
			{description}
			</Card.Text>
		</Card.Body>
		</Card>
	);
};

export default CardComponent;

