"use client";

import React from "react";
import PageTitle from "@/app/elements/pageTitle";
import { FormEngine } from "@brianwhaley/pixelated-components";
import formData from "@/app/data/contactForm.json";

// const calendarID = "palmettoepoxy%40gmail.com"
const calendarID = "1b783753ce78e200e6e505694b0610c48c8b5ca756f4d71986c4f7de97caaa13%40group.calendar.google.com";

export default function Contact() {
	return (
		<>
			<PageTitle title="Contact Us" />
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
							<FormEngine name="newrequest" id="newRequestForm" formData={formData} />
						</div>
						<div className="grid-s7-e6">
							<iframe src={`https://calendar.google.com/calendar/embed?src=${calendarID}&mode=WEEK`} style={{ border: 0 }} width="100%" height="600px" frameBorder="0" scrolling="no"></iframe>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

/* 
https://elfsight.com/blog/add-google-calendar-to-any-website/
*/
