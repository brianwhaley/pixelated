"use client";

import React from 'react';
import PropTypes, { InferProps } from "prop-types";
import type { CarouselCardType } from "../carousel/pixelated.carousel";
import { Loading } from "../loading/pixelated.loading";
import "./pixelated.tiles.css";
import "../../css/pixelated.grid.scss";

export function Tiles(
	props: { 
		cards: CarouselCardType[],
		rowCount?: number,
	}) {
	const rowCount = props.rowCount ?? 2;
	if (props.cards && props.cards.length > 0) {
		return (
			<div className="tilesContainer">
				<div className={`tileContainer row-${rowCount}col`}>
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
	rowCount: PropTypes.number,
};


/* ========== TILE ========== */
function Tile( props: TileType ) {
	return (
		<div className="tile" id={'tile-' + props.index}>
			{ (props.image) ? 
				<div className="tileImage">
					<img src={props.image} alt={props?.imageAlt ?? undefined} />
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
Tile.propTypes = {
	index: PropTypes.number.isRequired,
	cardLength: PropTypes.number.isRequired,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	bodyText: PropTypes.string,
};
export type TileType = InferProps<typeof Tile.propTypes>;
