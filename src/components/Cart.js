import React from "react";
import axios from "axios";

export const fetchCart = async () => {
	try {
		const userID = JSON.parse(localStorage.getItem("user")).id;
		if (userID) {
			const response = await axios.get("http://localhost:3000/users/" + userID);
			if (response.data.cart) {
				return response.data.cart;
			}
			return [];
		}
	} catch (error) {
		console.log("Error fetching cart ...");
	}
};

export const updateCart = async () => {
	const products = await fetchProducts();
	if (products.length === 0) {
		return [];
	}
	const temp = products.flat().map((item) => {
		const quantity = localStorage.getItem(item.name);
		return {
			item: item.name,
			quantity: quantity !== null ? parseInt(quantity, 10) : 0,
		};
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
			const response = await axios.get(`http://localhost:3000/${category}`);
			products.push(response.data);
		} catch (error) {
			console.log("error ... ", error);
		}
	}
	return products;
};

const uploadCart = async (cart) => {
	try {
		const userID = JSON.parse(localStorage.getItem("user")).id;
		await axios.patch("http://localhost:3000/users/" + userID, { cart });
	} catch (error) {
		console.log("Error uploading cart ...", error);
	}
};
