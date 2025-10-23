"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/app/elements/pageTitle";
import { FormEngine } from "@brianwhaley/pixelated-components";
import { emailFormData } from "@brianwhaley/pixelated-components";
import { Modal, handleModalOpen } from "@brianwhaley/pixelated-components";
import { Loading, ToggleLoading } from "@brianwhaley/pixelated-components";
import formData from "@/app/data/submitreviewform.json";

export default function SubmitReview() {

	function handleSubmit(e: Event) {
		ToggleLoading({show: true});
		emailFormData(e, postSubmit);
	}

	function postSubmit(e: Event) {
		// alert("Thank you for your review! We appreciate your feedback.");
		handleModalOpen(e as MouseEvent);
		ToggleLoading({show: false});
		const myForm = e.target as HTMLFormElement;
		myForm.reset();
	}

	const myContent = <div className="centered"><br /><br />Thank you for your review! <br />We appreciate your feedback.<br /><br /><br /></div>;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [modalContent, setModalContent] = useState<React.ReactNode>(myContent);
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
								onSubmitHandler={handleSubmit} 
							/>
						</div>
					</div>
				</div>
			</section>
			<Loading />
			<Modal modalContent={modalContent} />
		</>
	);
}
