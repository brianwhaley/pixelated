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
		this.saveDialog = this.saveDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.addRow = this.addRow.bind(this);
	}
	showDialog() {
		const mydialog = document.getElementById("newRequestDialog");
		mydialog.showModal();
	}
	saveRowDialog(e) {
		const mydialog = document.getElementById("newRequestDialog");
		const myform = document.getElementById("newRequestForm");
		e.preventDefault();
		let myFormData = [];
		const formData = new FormData(myform);
		for (let [key, value] of formData.entries()) {
			myFormData[key] = value ;
		}
		myFormData["Date"] = new Date().toLocaleDateString() ;
		myFormData["Status"] = "Submitted" ;
		console.log(myFormData);
		this.addRow(myFormData);
		mydialog.close();
	}
	async saveDialog(e){
		const sendmail_api = "https://nlbqdrixmj.execute-api.us-east-2.amazonaws.com/default/sendmail";

		const mydialog = document.getElementById("newRequestDialog");
		const tyDialog = document.getElementById("thankYouDialog");
		const myform = document.getElementById("newRequestForm");
		e.preventDefault();
		let myFormData = {};
		const formData = new FormData(myform);
		for (let [key, value] of formData.entries()) {
			myFormData[key] = value ;
		}
		myFormData.Date = new Date().toLocaleDateString() ;
		myFormData.Status = "Submitted" ;

		await fetch(sendmail_api, {
			method: 'POST',
			mode: 'cors', 
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(myFormData),
		})
			.then((response) => {
				if (response.status !== 200) {
					throw new Error(response.statusText);
				}
				console.log(response);
				return response.json();
			}) 

		mydialog.close();
		tyDialog.showModal();

	}
	closeDialog(id) {
		const mydialog = document.getElementById(id);
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
				<button type="button" id="showDialog" onClick={this.showDialog}>Request a Custom</button>
				<br /><br />
				<dialog id="newRequestDialog">
					<FormEngine name="newrequest" id="newRequestForm" formdata={formData} />
					<br />
					<center>
						<br />
						<button type="button" id="saveDialog" onClick={this.saveDialog}>Send</button>
						<button type="button" id="closeDialog" onClick={() => this.closeDialog('newRequestDialog')}>Close</button>
					</center>
				</dialog>
				<Table data={requestData} />
				<dialog id="thankYouDialog">
					<CalloutHeader title="Thank you!" />
					<center>Thank you for your your request.  Your request data has been sent for review.</center>
					<br />
					<center>
						<br /><button type="button" id="closeDialog" onClick={() => this.closeDialog('thankYouDialog')}>Close</button>
					</center>
				</dialog>
			</div>
		);
	}
}
