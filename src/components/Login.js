import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:3000/users");
			setUsers(response.data);
		} catch (error) {
			console.log("Error fetching users...");
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePassChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Email: " + email);
		console.log("pass: " + password);

		let found = false;
		users.forEach((user) => {
			if (user.email === email && user.password === password) {
            found = true;
            localStorage.setItem("user", JSON.stringify(user));
            alert("Logged in successfully");
            window.location.reload();
			}
		});

		if (!found) {
			alert("Invalid credentials");
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group style={{ marginBottom: "1rem" }}>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="example@gmail.com"
						value={email}
						onChange={handleEmailChange}
					/>
				</Form.Group>
				<Form.Group style={{ marginBottom: "1rem" }}>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={handlePassChange}
					/>
				</Form.Group>
				<Button style={{ marginTop: "1rem", width: "100%" }} type="submit">
					Log in{" "}
				</Button>
			</Form>
		</>
	);
};

export default Login;
