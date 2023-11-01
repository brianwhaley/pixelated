import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './pixelated.table.css'

export class Table extends Component {
	static propTypes = {
		data: PropTypes.array
	}

	constructor (props) {
		super(props)
		this.state = {
			tableData: []
		}
		this.state.tableData = this.props.data
	}

	getHeadings (data) {
		const headings = Object.keys(data[0]).map((key, i) => {
			return <th key={i}>{key}</th>
		})
		return <tr>{headings}</tr>
	}

	getRows (data) {
		return data.map((obj, i) => {
			return <tr key={i}>{this.getCells(obj)}</tr>
		})
	}

	getColumnCount (data) {
		return Object.keys(data[0]).length
	}

	getCells (obj) {
		return Object.values(obj).map((value, i) => {
			return <td key={i}>{value}</td>
		})
	}

	render () {
		return (
			<div>
				<table className="pixTable">
					<thead>{this.getHeadings(this.state.tableData)}</thead>
					<tbody>{this.getRows(this.state.tableData)}</tbody>
				</table>
			</div>
		)
	}
}
