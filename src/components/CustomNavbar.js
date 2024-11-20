import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios"

const CustomNavbar = () => {
	const [famousLocation, setFamousLocation] = useState([]);
	
	useEffect(() => {
		fetchFamousLocation();
	}, [])

	const fetchFamousLocation = async () => {
		try {
			const response = await axios.get("http://localhost:3000/famousLocations")
			setFamousLocation(response.data)
		}
		catch (error) {
			console.log("Error fetching locations...")
		}
	}
	return (
		<>
			<Navbar expand="lg" style={{ background: "#33372C", height: "6vh" }}>
				<Container>
					<Navbar.Brand href="/" style={{ color: "#FFE5CF" }}>
						Freshly
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						style={{ backgroundColor: "#FFE5CF" }}
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto flex-grow-1">
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
						<Nav className="ms-auto">
							<DropdownButton
								as={ButtonGroup}
								title="Select Location"
								style={{
									background: "#557C56",
									color: "white",
									margin: "0.5rem",
								}}
							>
								<Dropdown.Item eventKey="1">
									<input type="text" name='location' placeholder="Search" style={{ borderRadius: '0.2rem' }} />
									{famousLocation.map((location) => {
										<li>{location}</li>
									})}
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
							</DropdownButton>
							<Button
								style={{
									background: "#557C56",
									color: "white",
									marginRight: "0.5rem",
									marginRight: "0.5rem",
									marginTop: "0.5rem",
									marginBottom: "0.5rem",
								}}
							>
								Login / Signup
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default CustomNavbar;
