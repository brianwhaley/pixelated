"use client";

import React from "react";
import ContactCTA from "@/app/elements/contact";
import { CarouselSimple } from "@brianwhaley/pixelated-components";
import "@/app/globals.css";

export default function Projects() {

	return (
		<>
			<h1>Projects</h1>
			<div className="section-container">
				<CarouselSimple cards={[
					{
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721876006880-RD3MBTBGXCDJ53XFU3WD/IMG_5617.jpg?format=1000w",
						headerText: "Garage Floors & Concrete Coatings 2024",
						bodyText: "Garage floor epoxy coatings are our specialty at Palmetto Epoxy. Known for our robust, attractive finishes, we ensure each floor is a masterpiece of durability and style. Trust us to transform your garage with coatings that not only endure but also elevate the aesthetics of your space. ",
						link: "/projects/garage floors & concrete coatings 2024",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721875911469-JC7JDY9ZMZDRQSL56EWB/IMG_6229.jpg?format=1000w",
						headerText: "Paver Sealing 2024",
						bodyText: "Protect and enhance the natural beauty of your pavers with Palmetto Epoxy's expert paver sealing services. Our sealing process not only preserves the color and integrity of your pavers but also defends against weathering and wear. ",
						link: "/projects/paver-sealing-2024",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721876055862-AN84METQXABYLN1B8J9W/IMG_7622.jpg?format=1000w",
						headerText: "Driveways 2024",
						bodyText: "Palmetto Epoxy excels in enhancing driveways with durable surfacing and sealing. Our services protect and beautify, using top-quality materials for lasting results. View our project gallery to see our commitment to excellence and meticulous craftsmanship.",
						link: "/projects/driveways-2024",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721873859666-9ZLI1J1C4GOUIDNV40MM/72660401583__A553C378-5504-4A6F-9A2D-66F2EB7F2897.jpg?format=1000w",
						headerText: "One Hot Mama's Bluffton",
						bodyText: "In a refreshing change of pace we had the pleasure of improving the floor at One Hot Mama's Restaurant in Bluffton, Palmetto Epoxy installed a robust and stylish epoxy floor in the bar area. This floor not only adds a modern touch with its speckled finish but also offers unmatched durability and ease of maintenance, perfectly suited to the high-traffic demands of a bustling restaurant environment.",
						link: "/projects/one-hot-mamas-bluffton",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721873254281-XMP342S0QM3LML64LNS7/IMG_5220.jpg?format=1000w",
						headerText: "The Beauty Vault Salon - June 2024",
						bodyText: "In June 2024, Palmetto Epoxy partnered with The Beauty Vault Salon to install a stunning coin inlaid epoxy floor. This unique, eye-catching design not only complements the chic aesthetics of the salon but also provides a durable, easy-to-clean surface that enhances the space’s overall beauty and functionality.",
						link: "/projects/driveways-2024",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721873196979-95NRY9Z0AYKMRZ1E6WOF/IMG_4366.jpg?format=1000w",
						headerText: "Pulte Homes Amenity Fixtures - May 2024",
						bodyText: "In May 2024, Palmetto Epoxy had the privilege of enhancing several bathroom floors for Pulte Homes Amenity Fixtures. We installed high-quality, durable epoxy flooring, chosen for its sleek look and exceptional longevity, ensuring these communal spaces are both elegant and functional for years to come.",
						link: "/projects/pulte-homes-amenity-fixtures-may-2024",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1679656198534-09VZAHGTXMAISOEJCUN0/Nice+FLoor.jpg?format=1000w",
						headerText: "Glamour Shots",
						bodyText: "Here are a few of our proudest moments.",
						link: "/projects/glamour-shots",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1679539507230-GQWXWMUK6V0KUKBIDBX5/image_67214081.JPG?format=1000w",
						headerText: "Rangers Fans",
						bodyText: "Recently, we had the pleasure of completing an epoxy floor installation for a client who wanted to showcase their love for the NY Rangers. The project required our team to carefully mix and apply epoxy in the team's signature colors, resulting in a stunning and durable finish that perfectly captured the spirit of the Rangers. We are incredibly thankful to have been given the opportunity to bring this vision to life, and we couldn't be happier with the end result. The floor has transformed the space, giving it a unique and personalized touch that is sure to impress anyone who sees it. We are honored to have been a part of this project, and we look forward to helping our clients bring their own visions to life in the future.",
						link: "/projects/rangers-fans",
					} , {
						image: "https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1679539158241-FV1IHGSIGOWZPWNOEB4Z/Seapines+1_Done.JPG?format=1000w",
						headerText: "Seapines 1",
						bodyText: "We are thrilled to announce the completion of a recent project in Seapines, where we had the opportunity to transform an ordinary garage into a space of exceptional beauty and functionality. Our team at Palmetto Epoxy worked tirelessly to create a unique and durable garage floor that is sure to add thousands of dollars to the value of our client's home. From start to finish, we paid close attention to every detail, ensuring that the final product exceeded expectations. The finished product is not just a functional space for cars, tools, and storage, but also a place of pride that reflects the personality and style of our client. We are proud to have had the chance to create this stunning garage floor and look forward to helping more clients in the future transform their spaces into something truly special.",
						link: "/projects/seapines-1",
					}
				]} />
			</div>
            
			<div className="section-container">
				<ContactCTA />
			</div>
		</>
	);
}
