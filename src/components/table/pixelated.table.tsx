import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

import './pixelated.table.css';

function isImageURL(url: string) {
  	const isImage = /\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i.test(url);
	const isURL = () => { try { new URL(url); return true; } catch { return false; } };
	return isImage && isURL ;
}

Table.propTypes = {
	data: PropTypes.array.isRequired,
	id: PropTypes.string,
};
export type TableType = InferProps<typeof Table.propTypes>;
export function Table (props: TableType) {

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
			const myValue = (isImageURL(value)) ? <img src={value} /> : value ;
			return <td key={i}>{myValue}</td>;
		});
	}

	return (
		<div>
			<table id={props.id ?? undefined} className="pixTable">
				<thead>{getHeadings(props.data)}</thead>
				<tbody>{getRows(props.data)}</tbody>
			</table>
		</div>
	);

};

