import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { GrCart } from "react-icons/gr";
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
	const navigate = useNavigate();

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

	const handleBasketClick = () => {
		navigate("/basket");
	};

	return (
		<>
		<Navbar expand="lg" className="custom-navbar" style={{ background: "#33372C" }}>
			<Container>
			<Navbar.Brand as={Link} to="/" style={{ color: "#FFE5CF", fontSize: "2rem", fontWeight: "bold" }}>
				Freshly
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto flex-grow-1 d-flex align-items-center justify-content-between">
				<input
					name="search"
					style={{
					borderRadius: "0.5rem",
					width: "60%",
					padding: "0.5rem",
					marginRight: "1rem",
					}}
					placeholder="🔍 Search for products"
				/>
				<Dropdown
					as={ButtonGroup}
					style={{
					background: "#557C56",
					color: "white",
					marginRight: "0.5rem",
					}}
				>
					<Dropdown.Toggle>{display}</Dropdown.Toggle>
					<Dropdown.Menu>
					<input
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
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
						onClick={() => setDisplay(location.name)}
						>
						{location.name}
						</Dropdown.Item>
					))}
					</Dropdown.Menu>
				</Dropdown>

				<Button 
					variant="warning" 
					onClick={() => setShowLogin(true)}
					style={{
					margin: "0.5rem",
					fontWeight: "bold",
					}}
				>
					{user ? user.name : "Login/Signup"}
				</Button>
				<Button 
					variant="light" 
					style={{ 
						marginRight: "0.5rem", 
						marginTop: "0.5rem", 
						marginBottom: "0.5rem", 
						fontWeight: "bold" 
					}}
					onClick={handleBasketClick}
				>
					Basket <GrCart size={20} />
				</Button>
				</Nav>
			</Navbar.Collapse>
			</Container>
		</Navbar>

		{showLogin && !user && (
			<div
			onClick={() => setShowLogin(false)} // Close modal when clicked outside
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
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
				style={{
				width: "50vw",
				background: "whitesmoke",
				borderRadius: "1rem",
				padding: "1rem",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<Login />
				<p style={{ marginTop: "1rem" }}>
				Don't have an account?{" "}
				<u
					style={{ color: "blue", cursor: "pointer" }}
					onClick={() => {
					setShowSignup(true); // Show Signup modal when clicked
					setShowLogin(false); // Close Login modal
					}}
				>
					Sign up
				</u>
				</p>
			</div>
			</div>
		)}

		{showSignup && (
			<div
				onClick={() => setShowSignup(false)} // Close modal when clicked outside
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
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
				style={{
				width: "50vw",
				background: "whitesmoke",
				borderRadius: "1rem",
				padding: "1rem",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<SignUp />
				<p style={{ marginTop: "1rem" }}>
				Already have an account?{" "}
				<u
					style={{ color: "blue", cursor: "pointer" }}
					onClick={() => {
					setShowSignup(false); // Close Signup modal
					setShowLogin(true);   // Show Login modal
					}}
				>
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
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<h1>{user.name ? user.name : user.email}</h1>
				<br />
				<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to="/profile">
					<Button>Update Profile</Button>
				</Link>
				<Button
					variant="danger"
					onClick={() => {
					localStorage.removeItem("user");
					setUser(null);
					window.location.reload();
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
