import React, { Component } from "react";

export default class Search extends Component {
	render () {
		return (
			<div className="section-container" dangerouslySetInnerHTML={{ __html: "<gcse:search enablehistory='false'></gcse:search>" }}>
			</div>
		);
	}
}
