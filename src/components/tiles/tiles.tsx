"use client";

import React from 'react';
import PropTypes, { InferProps } from "prop-types";
import type { CarouselCardType } from "../carousel/carousel";
import { Loading } from "../general/loading";
import { SmartImage } from "../cms/cloudinary.image";
import { usePixelatedConfig } from '../config/config.client';
import "./tiles.css";
import "../../css/pixelated.grid.scss";


Tiles.propTypes = {
	cards: PropTypes.object.isRequired,
	rowCount: PropTypes.number,
};
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
								link={card.link}
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



/* ========== TILE ========== */
Tile.propTypes = {
	index: PropTypes.number.isRequired,
	cardLength: PropTypes.number.isRequired,
	link: PropTypes.string,
	image: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	bodyText: PropTypes.string,
};
export type TileType = InferProps<typeof Tile.propTypes>;
function Tile( props: TileType ) {
	const config = usePixelatedConfig();
	const tileBody = <div className="tileImage">
		<SmartImage src={props.image} title={props?.imageAlt ?? undefined} alt={props?.imageAlt ?? ""}
			cloudinaryEnv={config?.cloudinary?.product_env ?? undefined} />
		<div className="tileImageOverlay">
			<div className="tileImageOverlayText">
				<div className="tileImageOverlayTitle">{props.imageAlt}</div>
				<div className="tileImageOverlayBody">{props.bodyText}</div>
			</div>
		</div>
	</div>;
	return (
		<div className="tile" id={'tile-' + props.index}>
			{ props.link ?
				<a href={props.link} className="tileLink">
					{ tileBody }
				</a>
				:
				tileBody
			}
		</div>
	);
}

