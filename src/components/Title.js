import React from "react";
import img from "../resources/Green Stone Background.jpg";
import { Image, Container } from "react-bootstrap";
import { Carousel, CarouselItem } from "react-bootstrap";

const Title = () => {
	return (
		<Carousel interval={5000} >
			<Carousel.Item>
				<Image src={img} alt="First slide" style={{width: "100%", height: '70vh'}}/>
				<Carousel.Caption>
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<Image src={img} alt="First slide" style={{width: "100%", height: '70vh'}}/>
				<Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<Image src={img} alt="First slide" style={{width: "100%", height: '70vh'}}/>
				<Carousel.Caption>
					<h3>Third slide label</h3>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default Title;
