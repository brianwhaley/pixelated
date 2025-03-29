"use client";

import React, { Component } from "react";
import { CalloutHeader } from "@/app/components/callout/pixelated.callout";
import { FormEngine } from "@/app/components/form/pixelated.form";
import { Table } from "@/app/components/table/pixelated.table";
import requestData from "@/app/data/requests.json"
import formData from "@/app/data/requestform.json"

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
	async saveDialog(e){
		// const sendmail_api = "https://nlbqdrixmj.execute-api.us-east-2.amazonaws.com/default/sendmail";
		const sendmail_api = "https://sendmail.pixelated.tech/default/sendmail";

		const mydialog = document.getElementById("newRequestDialog");
		const tyDialog = document.getElementById("thankYouDialog");
		const myform = document.getElementById("newRequestForm");
		e.preventDefault();
		const myFormData = {};
		const formData = new FormData(myform);
		for (const [key, value] of formData.entries()) {
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
				return response.json();
			}) 

		mydialog.close();
		tyDialog.showModal();

	}
	closeDialog(id) {
		const mydialog = document.getElementById(id);
		mydialog.close();
	}
	saveRowDialog(e) {
		const mydialog = document.getElementById("newRequestDialog");
		const myform = document.getElementById("newRequestForm");
		e.preventDefault();
		const myFormData = [];
		const formData = new FormData(myform);
		for (const [key, value] of formData.entries()) {
			myFormData[key] = value ;
		}
		myFormData["Date"] = new Date().toLocaleDateString() ;
		myFormData["Status"] = "Submitted" ;
		this.addRow(myFormData);
		mydialog.close();
	}
	addRow(newRow) {
		const rows = this.state.tableData;
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
