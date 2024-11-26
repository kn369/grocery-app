import React from "react";
import img from "../resources/Green Stone Background.jpg";
import banner1 from "../resources/banner1.png";
import banner2 from "../resources/banner2.png";
import banner3 from "../resources/banner3.png";
import { Image, Container } from "react-bootstrap";
import { Carousel, CarouselItem } from "react-bootstrap";

const Title = () => {
	return (
		<Carousel interval={5000} >
			<Carousel.Item>
				<Image src={banner1} alt="First slide" style={{width: "100%", height: '70vh'}}/>
				<Carousel.Caption>
					<h3></h3>
					<p></p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<Image src={banner2} alt="Second slide" style={{width: "100%", height: '70vh'}}/>
				<Carousel.Caption>
					<h3></h3>
					<p></p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<Image src={banner3} alt="Third slide" style={{width: "100%", height: '70vh'}}/>
				<Carousel.Caption>
					<h3></h3>
					<p>
						
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default Title;
