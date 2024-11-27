import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [addresses, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};
	
	const handlePhoneChange = (event) => {
		setPhone(event.target.value);
	};

	const handleAddressChange = (event) => {
		setAddress(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePassChange = (event) => {
		const pass = event.target.value.replace(/\s+/g, ""); // Remove spaces
		setPassword(pass);
	};

	const handleConfirmPassChange = (event) => {
		const confirmPass = event.target.value.replace(/\s+/g, ""); // Remove spaces
		setConfirmPassword(confirmPass);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let passValid = password.length >= 8;
		let confirmPassValid = confirmPassword === password;

		if (passValid && confirmPassValid) {
			try {
				await axios.post("http://localhost:3000/users", {
					id: uuidv4(), // Generate a unique ID
					name: name,
					phone: phone,
					email: email,
					password: password,
					addresses: addresses,
					cart: []
				});
				window.location.reload();
				alert("Signed up successfully");
			} catch (error) {
				console.error("Error signing up:", error);
				alert("Error signing up");
			}
		} else {
			alert("Passwords do not match or are not valid");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group style={{ marginBottom: "1rem" }}>
				<Form.Label>Name</Form.Label>
				<Form.Control
				type="text"
				placeholder="Enter your name"
				value={name}
				onChange={handleNameChange}
				/>
			</Form.Group>
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
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
				type="text"
				placeholder="Enter your phone number"
				value={phone}
				onChange={handlePhoneChange}
				/>
			</Form.Group>
			<Form.Group style={{ marginBottom: "1rem" }}>
				<Form.Label>Address</Form.Label>
				<Form.Control
				type="text"
				placeholder="Enter your address"
				value={addresses}
				onChange={handleAddressChange}
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
			<Form.Group style={{ marginBottom: "1rem" }}>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
				type="password"
				placeholder="Confirm password"
				value={confirmPassword}
				onChange={handleConfirmPassChange}
				/>
			</Form.Group>
			<Button
				variant="primary"
				type="submit"
				style={{ marginTop: "1rem" }}
			>
				Sign Up
			</Button>
		</Form>
	);
};

export default SignUp;
