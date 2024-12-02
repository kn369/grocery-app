import React from "react";
import CustomNavbar from "./CustomNavbar";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Basket = () => {
   const [basket, setBasket] = useState([]);
   const [data, setData] = useState([]);

   const fetchBasket = async () => {
      const userID = JSON.parse(localStorage.getItem("user")).id;
      try {
         const response = await axios.get("http://localhost:3000/users/" + userID);
         setBasket(response.data.cart);
      } catch (error) {
         console.log("Error fetching basket...");
      }
   };

   const fetchCategories = async () => {
      try {
         const response = await axios.get("http://localhost:3000/categories");
         const categories = response.data.map((item) => item.link);
         return categories;
      } catch (error) {
         console.log("Error fetching categories...", error);
      }
   };

   const fetchProducts = async (category) => {
      try {
         const response = await axios.get("http://localhost:3000/" + category);
         return response.data.map((item) => {
            return {
               name: item.name,
               price: item.price,
               img: item.img,
               category: category,
            };
         });
      } catch (error) {
         console.log("Error fetching products...", error);
      }
   };

   const fetchData = async () => {
      const categories = await fetchCategories();
      const data = [];
      for (const category of categories) {
         const products = await fetchProducts(category);
         data.push(...products);
      }
      setData(data);
   };

   useEffect(() => {
      fetchBasket();
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

	return (
		<>
			<CustomNavbar />
			<Container>
				<Container
					style={{
						fontFamily: "serif",
						marginTop: "1rem",
						marginBottom: "1rem",
					}}
				>
					<h1>Basket</h1>
					<div>
						{basket.map((item) => {
							if (parseInt(item.quantity) === 0) {
								return;
							}
							let price = 0;
							data.forEach((product) => {
								if (product.name === item.item) {
									price = product.price;
								}
							});
							return (
								<div>
									<BasketCard {...item} price={price} />
								</div>
							);
						})}
					</div>
				</Container>
				<hr></hr>
				<h2>Check out:</h2>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<div>
						<h3>Items:</h3>
						<ol>
							{basket.map((item) => {
								if (parseInt(item.quantity) === 0) {
									return;
								}
								return <li>{item.item}</li>;
							})}
						</ol>
					</div>
					<div>
						<h3>Price:</h3>
						<div style={{ padding: "0" }}>
							{basket.map((item) => {
								if (parseInt(item.quantity) === 0) {
									return;
								}
								let price = 0;
								data.forEach((product) => {
									if (product.name === item.item) {
										price = product.price;
									}
								});
								return <p style={{ margin: "0" }}>{price * item.quantity}</p>;
							})}
						</div>
					</div>
				</div>
				<hr style={{ borderTop: "1px dotted #000" }} />
				<h3 style={{ display: "flex", justifyContent: "flex-end" }}>
					Total:{" "}
					{basket.reduce((acc, item) => {
						let price = 0;
						data.forEach((product) => {
							if (product.name === item.item) {
								price = product.price;
							}
						});
						return acc + price * item.quantity;
					}, 0)}
				</h3>
			</Container>
		</>
	);
};

export default Basket;
