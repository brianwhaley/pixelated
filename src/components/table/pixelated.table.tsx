import React from 'react';
import PropTypes from 'prop-types';

import './pixelated.table.css';

export function Table(props:{ data: Array<{ [key: string]: any }> }) {

	function getHeadings (data: Array<{ [key: string]: any }>) {
		const headings = Object.keys(data[0]).map((key, i) => {
			return <th key={i}>{key}</th>;
		});
		return <tr>{headings}</tr>;
	}

	function getRows (data: Array<{ [key: string]: any }>) {
		return data.map((obj, i) => {
			return <tr key={i}>{getCells(obj)}</tr>;
		});
	}

	function getCells (obj:{ [key: string]: any }) {
		return Object.values(obj).map((value, i) => {
			return <td key={i}>{value}</td>;
		});
	}

	return (
		<div>
			<table className="pixTable">
				<thead>{getHeadings(props.data)}</thead>
				<tbody>{getRows(props.data)}</tbody>
			</table>
		</div>
	);

}
Table.propTypes = {
	data: PropTypes.array
};
