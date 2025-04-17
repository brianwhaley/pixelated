"use client";

import React from "react";
import { CalloutHeader } from "@brianwhaley/pixelated-components";
import { FormEngine } from "@brianwhaley/pixelated-components";
import { Table } from "@brianwhaley/pixelated-components";
import requestData from "@/app/data/requests.json";
import formData from "@/app/data/requestform.json";

export default function Requests() {

	function showDialog() {
		const mydialog = document.getElementById("newRequestDialog") as HTMLDialogElement;
		mydialog.showModal();
	}

	async function saveDialog(e: React.MouseEvent<HTMLButtonElement>){
		// const sendmail_api = "https://nlbqdrixmj.execute-api.us-east-2.amazonaws.com/default/sendmail";
		const sendmail_api = "https://sendmail.pixelated.tech/default/sendmail";

		const mydialog = document.getElementById("newRequestDialog") as HTMLDialogElement;
		const tyDialog = document.getElementById("thankYouDialog") as HTMLDialogElement;
		const myform = document.getElementById("newRequestForm");
		e.preventDefault();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const myFormData: { [key: string]: any } = {};
		
		const formData = new FormData(myform as HTMLFormElement);
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
			}); 
		mydialog.close();
		tyDialog.showModal();
	}
	function closeDialog(id: string) {
		const mydialog = document.getElementById(id) as HTMLDialogElement;
		mydialog.close();
	}

	return (
		<div className="section-container">
			<CalloutHeader title="Custom Sunglass Requests" />
			<button type="button" id="showDialog" onClick={showDialog}>Request a Custom</button>
			<br /><br />



			<dialog id="newRequestDialog">
				<FormEngine name="newrequest" id="newRequestForm" formData={formData} />
				<br />
				<center>
					<br />
					<button type="button" id="saveDialog" onClick={saveDialog}>Send</button>
					<button type="button" id="closeDialog" onClick={() => closeDialog('newRequestDialog')}>Close</button>
				</center>
			</dialog>
			<Table data={requestData} />
			<dialog id="thankYouDialog">
				<CalloutHeader title="Thank you!" />
				<center>Thank you for your your request.  Your request data has been sent for review.</center>
				<br />
				<center>
					<br /><button type="button" id="closeDialog" onClick={() => closeDialog('thankYouDialog')}>Close</button>
				</center>
			</dialog>
		</div>
	);
}
