"use client";

import React from "react";
import { Callout, PageHeader } from "@brianwhaley/pixelated-components";
import { PageSection } from "@brianwhaley/pixelated-components";
// import { Tiles } from "@brianwhaley/pixelated-components";
import "./samples.css";

const sampleTiles = [
	{
		index: 0, cardIndex: 0, cardLength: 3,
		link: "/samples/page1",
		image: "https://s3media.angieslist.com/s3fs-public/exterior-house-landscaped-garden.jpeg",
		imageAlt: "Tom's Landscape Services",
	},
	{
		index: 1, cardIndex: 1, cardLength: 3,
		link: "/samples/page2",
		image: "https://www.bostonmagazine.com/wp-content/uploads/sites/2/2019/08/wedding-photographers-instagram.jpg",
		imageAlt: "Momento Studios Photography",
	},
	{
		index: 2, cardIndex: 2, cardLength: 3,
		link: "/samples/page3",
		image: "https://media.istockphoto.com/id/1198045184/photo/fine-dining-at-lunch.jpg?s=612x612&w=0&k=20&c=LS4QPJuFjbj1IveVKyV0NWC-BlabgyxFTy-dCCoJ35w=",
		imageAlt: "The Linen Table, Modern European Cuisine",
	}, 
	{
		index: 3, cardIndex: 3, cardLength: 3,
		link: "/samples/page4",
		image: "https://media.istockphoto.com/id/1156464124/photo/bicycle-chain-gearshift-transmission.jpg?b=1&s=612x612&w=0&k=20&c=FV0ZpqjnpW68apt2GFEKQOj4x1uL6TIT3lPtTzguS1E=",
		imageAlt: "Velocity Cycling Shop",
	},
	{
		index: 4, cardIndex: 4, cardLength: 3,
		link: "/samples/page5",
		image: "https://img.freepik.com/free-photo/vegetarian-taco-with-beans-guacamole-wooden-table_123827-36208.jpg",
		imageAlt: "Holy Guacamole Food Truck",
	}, 
];

export default function Samples() {
	
	return (
		<>
			<PageHeader title="Sample Page Designs" /><PageSection columns={2} maxWidth="1024px" id="samples-tiles-section">
				{/* <Tiles cards={sampleTiles} rowCount={3}/> */}
				{sampleTiles.map(tile => (
					<Callout
						key={tile.index}
						style="overlay"
						boxShape="squircle"
						url={tile.link}
						img={tile.image}
						imgAlt={tile.imageAlt}
						title={tile.imageAlt}
						buttonText={"View Sample"} />
				))}
			</PageSection>
		</>
	);
}