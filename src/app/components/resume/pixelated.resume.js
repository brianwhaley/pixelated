/* eslint-disable */

import React, { Fragment } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import "./pixelated.resume.css";

function isValidDate(date) {
	return !Number.isNaN(new Date(date).getTime());
}

export function Resume() {
	return (
		<section className="p_resume" id="resume-section">
			<div className="section-container">
				<div className="p_name grid12">
					<ResumeName data={props.data} />
				</div>
				<div className="grid3 bigpad divider">
					<div className="p_contact">
						<ResumeContact data={props.data} />
					</div>
					<div className="p_education">
						<ResumeEducation data={props.data} dateFormat="MM/yyyy" showDate={true} />
					</div>
					<div className="p_skills">
						<ResumeSkills data={props.data} />
					</div>
				</div>
				<div className="grid9 bigpad">
					<ResumeSummary data={props.data} />
					<ResumeQualifications data={props.data} />
					<ResumeWorkHistory data={props.data} dateFormat="MM/yyyy" showDate={true} />
					<ResumeVolunteer data={props.data} dateFormat="MM/yyyy" showDate={true} />
					<ResumeCertifications data={props.data} dateFormat="MM/yyyy" showDate={true} />
				</div>
			</div>
		</section>
	);
}

export function ResumeName(props) {
	ResumeName.propTypes = {
		data: PropTypes.object.isRequired
	};
	var myName = props.data.items[0].properties.contact[0].properties.name;
	return (
		<Fragment>
			<h1 className="p_name">{myName}</h1>
		</Fragment>
	);
}

export function ResumeContact(props) {
	ResumeContact.propTypes = {
		data: PropTypes.object.isRequired
	};
	var myContact = props.data.items[0].properties.contact[0];
	return (
		<Fragment>
			<h2>Contact Information</h2>
			<ul>
				<li><span className="p_email">{myContact.properties.email[0]}</span></li>
				<li><span className="p_street-address">{myContact.properties.adr[0].properties["street-address"]}, </span>
					<span className="p_locality">{myContact.properties.adr[0].properties.locality}, </span>
					<span className="p_region">{myContact.properties.adr[0].properties.region} </span>
					<span className="p_postal-code">{myContact.properties.adr[0].properties["postal-code"]}</span></li>
				<li><span className="p_tel">{myContact.properties.tel[0]}</span></li>
				<li><span className="p_url"><a href={myContact.properties.url[0]}>{myContact.properties.url[0]}</a></span></li>
			</ul>
		</Fragment>
	);
}

export function ResumeEducation(props) {
	ResumeEducation.propTypes = {
		data: PropTypes.object.isRequired,
		dateFormat: PropTypes.string.isRequired,
		showDate: PropTypes.bool.isRequired
	};
	var myElems = [];
	var myEducation = props.data.items[0].properties.education;
	for (var iKey in myEducation) {
		var ed = myEducation[iKey];
		var myEdLocation = ed.properties.location[0].properties;
		var myEndDate = isValidDate(ed.properties.end[0]) ? format(new Date(ed.properties.end[0]), props.dateFormat) : ed.properties.end[0] ;
		var myElem = <li key={iKey}>
			{props.showDate == true ? ( 
			<span className="dt_end">{myEndDate} - </span> 
			) : ( '' )}
			<span className="p_name">{ed.properties.name}, </span>
			<span className="p_org">{myEdLocation.org}, </span>
			<span className="p_locality">{myEdLocation.locality}, </span>
			<span className="p_region">{myEdLocation.region} </span>
		</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>Education</h2>
			<ul>{ myElems }</ul>
		</Fragment>
	);
}

export function ResumeQualifications(props) {
	ResumeQualifications.propTypes = {
		data: PropTypes.object.isRequired
	};
	var myElems = [];
	var myQual = props.data.items[0].properties.qualifications;
	for (var iKey in myQual) {
		var qual = myQual[iKey];
		var myElem = <h3 key={iKey}>{iKey}</h3>;
		var quals = qual.map((qualItem, iKey) =>
			<li key={"i" + iKey} className="p_qualification">{qualItem}</li>
		);
		myElems.push(myElem);
		myElems.push(<ul key={"q-" + iKey}>{quals}</ul>);
	}
	return (
		<Fragment>
			<h2>Professional Qualifications</h2>
			{ myElems }
		</Fragment>
	);
}

export function ResumeWorkHistory(props) {
	ResumeWorkHistory.propTypes = {
		data: PropTypes.object.isRequired,
		dateFormat: PropTypes.string.isRequired,
		showDate: PropTypes.bool.isRequired
	};
	var myElems = [];
	var myWork = props.data.items[0].properties.experience;
	for (var iKey in myWork) {
		var work = myWork[iKey];
		var myStartDate = isValidDate(work.properties.start[0]) ? format(new Date(work.properties.start[0]), props.dateFormat) : work.properties.start[0] ;
		var myEndDate = isValidDate(work.properties.end[0]) ? format(new Date(work.properties.end[0]), props.dateFormat) : work.properties.end[0] ;
		var myWorkLocation = work.properties.location[0].properties;
		var myElem = <li key={iKey}>
			{props.showDate == true ? ( 
			<span><span className="dt_start">{myStartDate} - </span>
			<span className="dt_end">{myEndDate} : </span></span>
			) : ( '' )}
			<span className="p_job-title">{myWorkLocation["job-title"]}, </span>
			<span className="p_org">{myWorkLocation.org}, </span>
			<span className="p_locality">{myWorkLocation.locality}, </span>
			<span className="p_region">{myWorkLocation.region} </span>
		</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>Work History</h2>
			<ul>{ myElems }</ul>
		</Fragment>
	);
}

export function ResumeVolunteer(props) {
	ResumeVolunteer.propTypes = {
		data: PropTypes.object.isRequired,
		dateFormat: PropTypes.string.isRequired,
		showDate: PropTypes.bool.isRequired
	};
	var myElems = [];
	var myVolunteer = props.data.items[0].properties.volunteer;
	for (var iKey in myVolunteer) {
		var vol = myVolunteer[iKey];
		var myStartDate = isValidDate(vol.properties.start[0]) ? format(new Date(vol.properties.start[0]), props.dateFormat) : vol.properties.start[0] ;
		var myEndDate = isValidDate(vol.properties.end[0]) ? format(new Date(vol.properties.end[0]), props.dateFormat) : vol.properties.end[0] ;
		var myVolLocation = vol.properties.location[0].properties;
		var myElem = <li key={iKey}>
			{props.showDate == true ? ( 
			<span><span className="dt_start">{myStartDate} - </span>
			<span className="dt_end">{myEndDate} : </span></span>
			) : ( '' )}
			<span className="p_job-title">{myVolLocation["job-title"]}, </span>
			<span className="p_org">{myVolLocation.org}, </span>
			<span className="p_locality">{myVolLocation.locality}, </span>
			<span className="p_region">{myVolLocation.region} </span>
		</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>Volunteer Work</h2>
			<ul>{ myElems }</ul>
		</Fragment>
	);
}

export function ResumeCertifications (props) {
	ResumeCertifications.propTypes = {
		data: PropTypes.object.isRequired,
		dateFormat: PropTypes.string.isRequired,
		showDate: PropTypes.bool.isRequired
	};
	var myElems = [];
	var myCerts = props.data.items[0].properties.certifications;
	for (var iKey in myCerts) {
		var cert = myCerts[iKey];
		var myStartDate = isValidDate(cert.properties.start[0]) ? format(new Date(cert.properties.start[0]), props.dateFormat) : cert.properties.start[0] ;
		var myElem = <li key={iKey}>
			{props.showDate == true ? ( 
			<span className="dt_start">{myStartDate} - </span>
			) : ( '' )}
			<span className="p_name">{cert.properties.name}, </span>
			<span className="p_location">{cert.properties.location}</span>
		</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>Certifications</h2>
			<ul>{ myElems }</ul>
		</Fragment>
	);
}

export function ResumeSkills (props) {
	ResumeSkills.propTypes = {
		data: PropTypes.object.isRequired
	};
	var myElems = [];
	var mySkills = props.data.items[0].properties.skills[0];
	for (var skill in mySkills) {
		var myElem = <h3 key={"c-" + skill} className="p_skill-category">{skill} : </h3>;
		myElems.push(myElem);
		var myElem2 = <span key={"s-" + skill} className="p_skill">{mySkills[skill]}<br /></span>;
		myElems.push(myElem2);
	}
	return (
		<Fragment>
			<h2>Skills</h2>
			<div className="p_skills">
				{ myElems }
			</div>
		</Fragment>
	);
}

export function ResumeSummary (props) {
	ResumeSummary.propTypes = {
		data: PropTypes.object.isRequired
	};
	var myElems = [];
	var mySummary = props.data.items[0].properties.summary;
	for (var summary in mySummary) {
		var myElem = <li key={summary}>{mySummary[summary]}</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>Professional Summary</h2>
			<ul className="p_summary">{ myElems }</ul>
		</Fragment>
	);
}
