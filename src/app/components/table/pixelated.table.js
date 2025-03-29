import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './pixelated.table.css'

export function Table(props) {
	Table.propTypes = {
		data: PropTypes.array
	}

	function getHeadings (data) {
		const headings = Object.keys(data[0]).map((key, i) => {
			return <th key={i}>{key}</th>
		})
		return <tr>{headings}</tr>
	}

	function getRows (data) {
		return data.map((obj, i) => {
			return <tr key={i}>{getCells(obj)}</tr>
		})
	}

	function getCells (obj) {
		return Object.values(obj).map((value, i) => {
			return <td key={i}>{value}</td>
		})
	}

	return (
		<div>
			<table className="pixTable">
				<thead>{getHeadings(props.data)}</thead>
				<tbody>{getRows(props.data)}</tbody>
			</table>
		</div>
	)

}
