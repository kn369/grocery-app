import React from "react";
import axios from "axios";

export const updateCart = () => {};

const fetchProducts = async () => {
   let categories = [];
	try {
		const response = await axios.get("http://localhost:3000/categories");
		categories = JSON.parse(response.data).map((item) => item.link);
	} catch (error) {
		console.log("error ... ", error);
   }
   
   let products = []
   try {
      const resposne
   }
};
