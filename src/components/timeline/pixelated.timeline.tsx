
import React from 'react';
import PropTypes, { InferProps } from "prop-types";
import "./pixelated.timeline.css";
import "../../css/pixelated.grid.scss";

Timeline.propTypes = {
	timelineData: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			content: PropTypes.string,
			image: PropTypes.string,
			direction: PropTypes.string.isRequired
		})
	).isRequired
};
export type TimelineType = InferProps<typeof Timeline.propTypes> & { [key: string]: unknown };
export function Timeline(props: TimelineType) {

	return (
		<div className="timeline">
			{props.timelineData.map((item, index) =>
				item ? (
					<TimelineItem
						key={index}
						title={item.title ?? ''}
						content={item.content}
						image={item.image}
						direction={item.direction}
					/>
				) : null
			)}
		</div>
	);
}

TimelineItem.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	image: PropTypes.string,
	direction: PropTypes.string.isRequired

};
export type TimelineItemType = InferProps<typeof TimelineItem.propTypes> & { [key: string]: unknown };
export default function TimelineItem(props: TimelineItemType) {
	return (
		<div className={"timelineContainer timeline" + props.direction }>
			<div className="timelineContent">
				<div className="row-3col">
					<div className="grid-s1-e1">
				        <img src={props.image ?? undefined} alt={props.title} />
					</div>
					<div className="grid-s2-e3">
						<h2>{props.title}</h2>
						<p>{props.content}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
