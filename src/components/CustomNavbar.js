import React from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	Nav,
	Container,
	Button,
	Dropdown,
	DropdownButton,
	ButtonGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const CustomNavbar = () => {
	const [location, setLocation] = useState("");
	const [famousLocation, setFamousLocation] = useState([]);
	const [display, setDisplay] = useState("Select Location");

	const handleLocationChange = (event) => {
		event.preventDefault();
		setLocation(event.target.value);
	};

	useEffect(() => {
		fetchFamousLocation();
	}, []);

	const fetchFamousLocation = async () => {
		try {
			const response = await axios.get("http://localhost:3000/famousLocations");
			setFamousLocation(response.data);
		} catch (error) {
			console.log("Error fetching locations...");
		}
	};


	return (
		<>
			<Navbar
				expand="lg"
				className="custom-navbar"
				style={{ background: "#33372C", height: "6vh" }}
			>
				<Container>
					<Navbar.Brand as={Link} to="/" style={{ color: "#FFE5CF" }}>
						Freshly
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" style={{ margin: "1rem" }}>
						<Nav className="me-auto flex-grow-1 d-flex align-items-center">
							<input
								name="search"
								style={{
									borderRadius: "0.5rem",
									width: "100%",
									padding: "0.5rem",
								}}
								placeholder="🔍 Search for products"
							/>
						</Nav>
						<Nav className="ms-auto d-flex align-items-center">
							<Dropdown
								as={ButtonGroup}
								style={{
									background: "#557C56",
									color: "white",
									margin: "0.5rem",
								}}
							>
								<Dropdown.Toggle>{display}</Dropdown.Toggle>
								<Dropdown.Menu>
									<input
										type="text"
										value={location}
										onChange={handleLocationChange}
										placeholder="Search Location"
										style={{
											borderRadius: "0.5rem",
											padding: "0.5rem",
											margin: "0.5rem",
										}}
									/>
									<Dropdown.Divider />
									{famousLocation.map((location) => (
										<Dropdown.Item
											key={location.id}
											value={location.name}
											onClick={() => setDisplay(location.name)}
										>
											{location.name}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<Button
								style={{
									background: "#557C56",
									color: "white",
									marginLeft: "0.5rem",
									marginRight: "0.5rem",
									marginTop: "0.5rem",
									marginBottom: "0.5rem",
								}}
							>
								Login / Signup
							</Button>
							<Button style={{background: "white"}}>🛍️</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default CustomNavbar;
