import React, { Component } from "react";

import { CalloutHeader } from "@brianwhaley/pixelated-components";

import { Table } from "./pixelated.tables"
import requestData from "../data/pixelated.requests.json"

import { FormEngine } from "@brianwhaley/pixelated-components";
import formData from "../data/pixelated.requestform.json"


export default class Requests extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tableData: []
		}
		this.state.tableData = requestData;
		this.showDialog = this.showDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.addRow = this.addRow.bind(this);
	}
	showDialog() {
		const mydialog = document.getElementById("newRequestDialog");
		mydialog.showModal();
	}
	closeDialog(e) {
		const mydialog = document.getElementById("newRequestDialog");
		const myform = document.getElementById("newRequestForm");
		if(e.target.innerText == "Save") {
			e.preventDefault();
			let myFormData = [];
			const formData = new FormData(myform);
			for (let [key, value] of formData.entries()) {
				myFormData[key] = value ;
			}
			myFormData["Date"] = new Date().toLocaleDateString() ;
			myFormData["Status"] = "Submitted" ;
			this.addRow(myFormData);
		}
		mydialog.close();
	}
	addRow(newRow) {
		var rows = this.state.tableData;
		rows.push(newRow);
		this.setState({tableData: rows});
	}
	render () {
		return (
			<div className="section-container">
				<CalloutHeader title="Custom Sunglass Requests" />
				<Table data={requestData} />
				<button type="button" id="showDialog" onClick={this.showDialog}>Add</button>
				<dialog id="newRequestDialog">
					<FormEngine name="newrequest" id="newRequestForm" formdata={formData} />
					<button type="button" id="saveDialog" onClick={this.closeDialog}>Save</button>
					<button type="button" id="closeDialog" onClick={this.closeDialog}>Close</button>
				</dialog>
			</div>
		);
	}
}
