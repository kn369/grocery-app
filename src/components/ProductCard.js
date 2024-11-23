import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = (props) => {
	const { name, price } = props;
	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(0);
	const [cart, setCart] = useState([]);

	const fetchUser = async () => {
		try {
			const response = await axios.get("http://localhost:3000/users/" + JSON.parse(localStorage.getItem("user")).id);
			setUser(response.data);
			const initialCart = user.cart;
			if (initialCart) {
				setCart(initialCart);
         }
         else {
            setCart([]);
         }
		} catch (error) {
			console.log("Error fetching user data ...");
		}
	};

	useEffect(() => {
		fetchUser();
		console.log(user);
	}, []);

   const updateCart = async () => {
      try {
         const response = await axios.put("http://localhost:3000/users/" + user.id, { ...user, cart: cart });
         console.log(response.data);
      }
      catch (error) {
         console.log("Error updating cart ...");
      }
   }

	const increase = () => {
      setQuantity(quantity + 1);
      const updatedCart = cart.map((product) => {
         if (product.name === name) {
            return { ...product, quantity: product.quantity + 1 };
         }
         return product;
      })
	};

	const decrease = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<Card>
			<div style={{ display: "flex" }}>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{"Rs " + price + "/-"}</Card.Text>
				</Card.Body>
				<div style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
					<Button onClick={decrease}>-</Button>
					<p style={{ margin: "0 0.5rem" }}>{quantity}</p>
					<Button onClick={increase} style={{ marginRight: "0.5rem" }}>
						+
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ProductCard;
