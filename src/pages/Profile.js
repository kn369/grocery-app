import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Profile = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [isEditing, setIsEditing] = useState(null);
	const [editValue, setEditValue] = useState("");
	const [newAddress, setNewAddress] = useState("");
	const [editingAddressIndex, setEditingAddressIndex] = useState(null);
	const [editingAddressValue, setEditingAddressValue] = useState("");

	const handleEdit = (field) => {
		setIsEditing(field);
		setEditValue(user[field]);
	};

	const handleEditAddress = (index) => {
		setEditingAddressIndex(index);
		setEditingAddressValue(user.addresses[index]);
	};

	const handleSave = async (field) => {
		const updatedUser = { ...user, [field]: editValue };
		try {
			await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
			setUser(updatedUser);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setIsEditing(null);
			alert("User data updated successfully");
		} catch (error) {
			console.error("Error updating user data:", error);
			alert("Error updating user data");
		}
	};

	const handleDeleteAddress = async (index) => {
		const updatedUser = {
			...user,
			addresses: user.addresses.filter((_, i) => i !== index),
		};
		try {
			await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
			setUser(updatedUser);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			alert("Address deleted successfully");
		} catch (error) {
			console.error("Error deleting address:", error);
			alert("Error deleting address");
		}
	};

	const handleSaveAddress = async (index) => {
		const updatedAddresses = user.addresses.map((address, i) =>
			i === index ? editingAddressValue : address
		);
		const updatedUser = { ...user, addresses: updatedAddresses };
		try {
			await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
			setUser(updatedUser);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setEditingAddressIndex(null);
			alert("Address updated successfully");
		} catch (error) {
			console.error("Error updating address:", error);
			alert("Error updating address");
		}
	};

	const handleAddAddress = async (event) => {
		event.preventDefault();

		if (!newAddress) {
			alert("Please enter an address");
			return;
		}

		const updatedUser = {
			...user,
			addresses: user.addresses
				? [...user.addresses, newAddress]
				: [newAddress],
		};
		console.log(updatedUser);
		try {
			await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
			setUser(updatedUser);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			alert("Address added successfully");
			window.location.reload();
		} catch (error) {
			console.error("Error adding address:", error);
			alert("Error adding address");
		}
	};
	if (!user) {
		return (
			<p>
				No user data available. Please <Link to="/">log in</Link>.
			</p>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				backgroundColor: "#f0f0f0",
				padding: "20px",
			}}
		>
			<h1 style={{ color: "#333", marginBottom: "20px" }}>
				Welcome {user.name ? user.name : user.email}
			</h1>

			<div
				style={{
					backgroundColor: "#fff",
					padding: "2rem",
					borderRadius: "8px",
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
					width: "80%",
				}}
			>
				{["name", "email", "phone"].map((field) => (
					<div
						key={field}
						style={{
							margin: "10px 0",
							color: "#555",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<p style={{ margin: "0 10px 0 0", fontSize: "1.5vw" }}>
							{field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
							{isEditing === field ? (
								<input
									type="text"
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
								/>
							) : (
								user[field]
							)}
						</p>
						{isEditing === field ? (
							<button
								style={{
									borderRadius: "0.5rem",
									background: "0",
									border: "none",
								}}
								onClick={() => handleSave(field)}
							>
								Save
							</button>
						) : (
							<button
								style={{
									borderRadius: "0.5rem",
									background: "0",
									border: "none",
								}}
								onClick={() => handleEdit(field)}
							>
								🖊️
							</button>
						)}
					</div>
				))}
				<h2 style={{ color: "#555", margin: "10px 0" }}>Addresses</h2>
				{user.addresses ? (
					user.addresses.map((address, index) => (
						<div
							key={index}
							style={{
								margin: "10px 0",
								color: "#555",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<p style={{ margin: "0 10px 0 0", fontSize: "1.5rem" }}>
								{index + 1}
							</p>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								{editingAddressIndex === index ? (
									<>
										<input
											type="text"
											value={editingAddressValue}
											onChange={(e) => setEditingAddressValue(e.target.value)}
											style={{
												border: "none",
												width: "100%",
                                    background: "#f0f0f0",
                                    fontSize: "1.5rem"
											}}
										/>
										<button
											style={{ background: "0", border: "none" }}
											onClick={() => handleSaveAddress(index)}
										>
											Save
										</button>
									</>
								) : (
									<>
										<p style={{ margin: "0 10px 0 0", fontSize: "1.5rem" }}>
											{address}
										</p>
										<div style={{ display: "flex", alignItems: "center" }}>
											<button
												style={{
													background: "0",
													border: "none",
													marginRight: "0.5rem",
												}}
												onClick={() => handleEditAddress(index)}
											>
												🖊️
											</button>
											<Button
												variant="danger"
												onClick={() => handleDeleteAddress(index)}
												style={{
													height: "1.5rem",
													width: "1.5rem",
													padding: "0",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: "1rem",
													lineHeight: "1rem",
													marginRight: "0.5rem",
												}}
											>
												╳
											</Button>
										</div>
									</>
								)}
							</div>
						</div>
					))
				) : (
					<p>No addresses available</p>
				)}
				<Form onSubmit={handleAddAddress}>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Enter new address"
							value={newAddress}
							onChange={(e) => setNewAddress(e.target.value)}
							style={{ marginBottom: "1rem", fontSize: "1.5rem" }}
						/>
					</Form.Group>
					<Button type="submit">Add address</Button>
				</Form>
			</div>
		</div>
	);
};

export default Profile;
