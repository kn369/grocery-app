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
	Offcanvas,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import SignUp from "./SignUp";

const CustomNavbar = () => {
	const [location, setLocation] = useState("");
	const [famousLocation, setFamousLocation] = useState([]);
	const [display, setDisplay] = useState("Select Location");
	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const [user, setUser] = useState(null);

	const handleLocationChange = (event) => {
		event.preventDefault();
		setLocation(event.target.value);
	};

	useEffect(() => {
		fetchFamousLocation();
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	const fetchFamousLocation = async () => {
		try {
			const response = await axios.get("http://localhost:3000/famousLocations");
			setFamousLocation(response.data);
		} catch (error) {
			console.log("Error fetching locations...");
		}
	};

	console.log(!user);
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
								onClick={() => {
									setShowLogin(true);
								}}
								style={{
									background: "#557C56",
									color: "white",
									marginLeft: "0.5rem",
									marginRight: "0.5rem",
									marginTop: "0.5rem",
									marginBottom: "0.5rem",
								}}
							>
								{user ? user.email : "Login/Signup"}
							</Button>

							<Button style={{ background: "white" }}>🛍️</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{showLogin && !user && (
				<div
					onClick={() => setShowLogin(false)}
					style={{
						position: "fixed",
						zIndex: "1000",
						top: "0",
						left: "0",
						height: "100vh",
						width: "100vw",
						background: "rgba(0,0,0,0.5)",
						backdropFilter: "blur(5px)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							width: "50vw",
							background: "whitesmoke",
							borderRadius: "1rem",
							padding: "1rem",
						}}
					>
						<Login />

						<p style={{ marginTop: "1rem" }}>
							Don't have an account?{" "}
							<u
								style={{ color: "blue" }}
								onClick={() => {
									setShowSignup(true);
									setShowLogin(false);
								}}
							>
								{" "}
								Sign up
							</u>
						</p>
					</div>
				</div>
			)}

			{showSignup && (
				<div
					onClick={() => setShowSignup(false)}
					style={{
						position: "fixed",
						zIndex: "1000",
						top: "0",
						left: "0",
						height: "100vh",
						width: "100vw",
						background: "rgba(0,0,0,0.5)",
						backdropFilter: "blur(5px)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							width: "50vw",
							background: "whitesmoke",
							borderRadius: "1rem",
							padding: "1rem",
						}}
					>
						<SignUp />
						<p style={{ marginTop: "1rem" }}>
							Already have an account?{" "}
							<u
								style={{ color: "blue" }}
								onClick={() => {
									setShowSignup(false);
									setShowLogin(true);
								}}
							>
								{" "}
								Login
							</u>
						</p>
					</div>
				</div>
			)}

			{showLogin && user && (
				<div
					onClick={() => setShowLogin(false)}
					style={{
						position: "fixed",
						zIndex: "1000",
						top: "0",
						left: "0",
						height: "100vh",
						width: "100vw",
						background: "rgba(0,0,0,0.5)",
						backdropFilter: "blur(5px)",
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "flex-start",
					}}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							background: "whitesmoke",
							borderRadius: "1rem",
							padding: "1rem",
							margin: "1rem",
						}}
					>
						<h1>Welcome {user.name ? user.name : user.email}</h1>
						<p>{user.email}</p>

						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Button href="/profile" target="_blank">update profile</Button>
							<Button
								variant="danger"
								onClick={() => {
									localStorage.removeItem("user");
									setUser(null);
									alert("Logged out successfully");
								}}
							>
								Logout
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CustomNavbar;
