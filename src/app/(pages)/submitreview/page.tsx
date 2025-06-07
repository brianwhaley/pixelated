"use client";

import React, { useEffect } from "react";
import PageTitle from "@/app/elements/pageTitle";
import { FormEngine } from "@brianwhaley/pixelated-components";
import { emailFormData } from "@brianwhaley/pixelated-components";
import formData from "@/app/data/submitreviewform.json";

export default function SubmitReview() {

	function postSubmit(e: Event) {
		alert("Thank you for your review! We appreciate your feedback.");
		const myForm = e.target as HTMLFormElement;
		myForm.reset();
	}

	useEffect(() => {
		const form = document.getElementById("submitReviewForm") as HTMLFormElement;
		if (form) {
			const installdate = form.querySelector('input#installdate[type="date"]') as HTMLInputElement;
			const submitbutton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
			const submitDiv = submitbutton.parentElement as HTMLDivElement;
			if(submitDiv) {
				submitDiv.style.textAlign = "center";
				submitDiv.style.margin = "20px auto";
			}
			if (installdate) {
				installdate.valueAsDate = new Date();
				installdate.dispatchEvent(new Event('change'));
			}
		}
	}, []);

	return (
		<>
			<PageTitle title="Submit your Review" />
			<section className="" id="submitreview-section">
				<div className="section-container">
					<div className="row-12col">
						<div className="grid-s1-e12">
							<h2 className="centered">
								Share your experience with Palmetto Epoxy!<br />
								We value your feedback and <br />
								want to hear about your epoxy flooring project.  
								<br /><br /><br />
							</h2>
							<FormEngine 
								name="submitreview" 
								id="submitReviewForm" 
								formData={formData} 
								onSubmitHandler={(e: Event) => emailFormData(e, postSubmit)} 
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
