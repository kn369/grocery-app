import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Profile = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [isEditing, setIsEditing] = useState(null);
	const [editValue, setEditValue] = useState("");

	const handleEdit = (field) => {
		setIsEditing(field);
		setEditValue(user[field]);
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
				{["name", "email", "phone", "addresses"].map((field) => (
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
			</div>
			<div>
				{/* Button to return to home page */}
				<Link to="/">
					<Button
						style={{
							background: "#557C56",
							color: "white",
							marginTop: "1rem",
						}}
					>
						Home
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Profile;
