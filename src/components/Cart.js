import React from "react";
import axios from "axios";

export const updateCart = async () => {
	const products = await fetchProducts();
	if (products.length === 0) {
		return [];
	}
	const temp = products.map((item) => {
		const storedItem = {
			item: item.name,
			quantity: localStorage.getItem(item.name)
				? parseInt(localStorage.getItem(item.name))
				: 0,
			price: item.price,
		};
		localStorage.setItem(item.name, JSON.stringify(storedItem));
		return storedItem;
	});
	console.log(temp);
	try {
		await uploadCart(temp);
	} catch (error) {
		console.log("Error uploading cart ...", error);
	}
};

const fetchProducts = async () => {
	let categories = [];
	try {
		const response = await axios.get("http://localhost:3000/categories");
		categories = response.data.map((item) => item.link);
	} catch (error) {
		console.log("error ... ", error);
	}

	let products = [];
	for (const category of categories) {
		try {
			const response = await axios.get("http://localhost:3000/" + category);
			products.push(...response.data);
		} catch (error) {
			console.log("error ... ", error);
		}
	}
	return products;
};

export const uploadCart = async (cart) => {
	const userID = JSON.parse(localStorage.getItem("user")).id;
	try {
		const response = await axios.get(`http://localhost:3000/users/${userID}`);
		const user = response.data;
		const updatedUser = { ...user, cart: cart };
		await axios.put(`http://localhost:3000/users/${userID}`, updatedUser);
		console.log("Cart updated successfully");
	} catch (error) {
		console.log("Error uploading cart ...", error);
	}
};
