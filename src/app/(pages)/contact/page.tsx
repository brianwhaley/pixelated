"use client";

import React from "react";
import { FormEngine } from "@brianwhaley/pixelated-components";

const formData = {
    "fields" : [
        {
            "component" : "FormInput",
            "props" : {
                "type" : "text",
                "id" : "firstname",
                "name" : "firstname",
                "defaultValue" : null,
				"size" : "40",
				"display" : "vertical",
				"required" : "required",
				"label" : "First Name (required) : ",
				"tooltip" : "Please type in your First Name"
            }
        },
        {
            "component" : "FormInput",
            "props" : {
                "type" : "text",
                "id" : "lastname",
                "name" : "lastname",
                "defaultValue" : null,
				"size" : "40",
				"display" : "vertical",
				"required" : "required",
				"label" : "Last Name (required) : ",
				"tooltip" : "Please type in your Last Name"
            }
        },
		{
            "component" : "FormInput",
            "props" : {
                "type" : "email",
                "id" : "email",
                "name" : "email",
                "defaultValue" : null,
				"size" : "40",
				"display" : "vertical",
				"required" : "required",
				"label" : "Email Address (required) : ",
				"validate" : "isValidEmailAddress",
				"tooltip" : "Please type in your Email Address"
            }
        },
		{
            "component" : "FormInput",
            "props" : {
                "type" : "subject",
                "id" : "subject",
                "name" : "subject",
                "defaultValue" : null,
				"size" : "40",
				"display" : "vertical",
				"required" : "required",
				"label" : "Subject (required) : ",
				"tooltip" : "Please type in the subject of your request"
            }
        },
		{
            "component" : "FormTextarea",
            "props" : {
                "id" : "message",
                "name" : "message",
                "rows" : "5",
                "cols" : "30",
                "defaultValue" : null,
				"display" : "vertical",
				"required" : "required",
				"label" : "Message (required) : ",
				"tooltip": "Please enter the details of your request"
            }
        }
    ]
}

export default function Contact() {
    return (
        <>
            <h1>Contct Us</h1>
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
                        <iframe src="https://calendar.google.com/calendar/embed?src=brian.whaley%40gmail.com&mode=WEEK" style={{ border: 0 }} width="100%" height="400px" frameBorder="0" scrolling="no"></iframe>
                    </div>
                </div>
            </div>
        </>
    );
}

/* 
https://elfsight.com/blog/add-google-calendar-to-any-website/
*/
