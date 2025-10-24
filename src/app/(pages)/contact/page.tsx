"use client";

import React, { useEffect, useState } from "react";
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { FormEngine } from "@brianwhaley/pixelated-components";
import { emailFormData } from "@brianwhaley/pixelated-components";
import { Loading, ToggleLoading } from "@brianwhaley/pixelated-components";
import { Modal, handleModalOpen } from "@brianwhaley/pixelated-components";

import formData from "@/app/data/contactform.json";

// const calendarID = "palmettoepoxy%40gmail.com"
const calendarID = "1b783753ce78e200e6e505694b0610c48c8b5ca756f4d71986c4f7de97caaa13%40group.calendar.google.com";

export default function Contact() {

	const [modalContent, setModalContent] = useState<React.ReactNode>();
	useEffect(() => {
		const myContent = <div className="centered"><br /><br />Thank you for contacting us!<br />We will get back to you as soon as we can.<br /><br /><br /></div>;
		setModalContent(myContent);
	}, []);

	function handleSubmit(e: Event) {
		ToggleLoading({show: true});
		emailFormData(e, postSubmit);
	}

	function postSubmit(e: Event) {
		// alert("Thank you for contacting us! We will get back to you as soon as we can.");
		handleModalOpen(e as MouseEvent);
		ToggleLoading({show: false});
		const myForm = e.target as HTMLFormElement;
		myForm.reset();
	}
	
	useEffect(() => {
		const form = document.getElementById("newRequestForm") as HTMLFormElement;
		if (form) {
			const submitbutton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
			const submitDiv = submitbutton.parentElement as HTMLDivElement;
			if(submitDiv) {
				submitDiv.style.textAlign = "center";
				submitDiv.style.margin = "20px auto";
			}
		}
	}, []);
		
	return (
		<>
			<CalloutLibrary.PageTitle title="Contact Us" />
			<section className="" id="contactus-section">
				<div className="section-container">
					<div className="row-12col">
						<div className="grid-s1-e5">
							<div>
								Please fill out the form below. 
								We would LOVE to answer any questions or to setup 
								an appointment to talk about our favorite subject… 
								Epoxy Flooring! 
								<br /><br /><br /><br />
							</div>
							<FormEngine 
								name="newrequest" 
								id="newRequestForm" 
								formData={formData} 
								onSubmitHandler={handleSubmit} 
							/>
						</div>
						<div className="grid-s7-e6">
							<iframe src={`https://calendar.google.com/calendar/embed?src=${calendarID}&mode=WEEK`} style={{ border: 0 }} width="100%" height="600px" frameBorder="0" scrolling="no"></iframe>
						</div>
					</div>
				</div>
			</section>
			<Loading />
			<Modal modalContent={modalContent} />
		</>
	);
}

/* 
https://elfsight.com/blog/add-google-calendar-to-any-website/
*/
