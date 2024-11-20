import React from "react";
import img from "../resources/Green Stone Background.jpg";
import { Image, Container } from "react-bootstrap";

const Title = () => {
	return (
		<Container fluid style={{padding: '0px', margin: '0px'}}>
			<Image src={img} alt="Green Stone Background" fluid style={{width: '100vw', height: '70vh', objectFit: 'cover'}} />
		</Container>
	);
};

export default Title;
