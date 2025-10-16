"use client";

import React from 'react';
import PropTypes from 'prop-types';
import type { CarouselCardType } from "../carousel2/pixelated.carousel";
import { Loading } from "@brianwhaley/pixelated-components";
import "./pixelated.tiles.css";
import "../../css/pixelated.grid.scss";

export function Tiles(
	props: { 
		cards: CarouselCardType[],
	}) {
	if (props.cards && props.cards.length > 0) {
		return (
			<div className="tilesContainer">
				<div className="tileContainer row-2col">
					{ props.cards.map((card: CarouselCardType, i: number) => (
						<div key={i} className="gridItem">
							<Tile
								index={i}
								cardLength={props.cards.length}
								image={card.image}
								imageAlt={card.imageAlt}
								bodyText={card.bodyText}
							/>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<Loading />
		);
	}
}
Tiles.propTypes = {
	cards: PropTypes.object.isRequired,
};


/* ========== TILE ========== */
function Tile( props: any ) {
	return (
		<div className="tile" id={'tile-' + props.index}>
			{ (props.image) ? 
				<div className="tileImage">
					<img src={props.image} alt={props?.imageAlt} />
					<div className="tileImageOverlay">
						<div className="tileImageOverlayText">
							<div className="tileImageOverlayTitle">{props.imageAlt}</div>
							<div className="tileImageOverlayBody">{props.bodyText}</div>
						</div>
					</div>
				</div> : null 
			}
		</div>
		
	);
}
