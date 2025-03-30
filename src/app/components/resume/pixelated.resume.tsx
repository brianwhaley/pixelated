
import React, { Fragment } from "react";
import { format } from "date-fns";
import "./pixelated.resume.css";

function isValidDate(date: string) {
	return !Number.isNaN(new Date(date).getTime());
}

type resumeProps = {
	title: string
	data: any
	dateFormat: string
	showDate: boolean
}

type simpleResumeProps = {
	data: any
}

export function Resume (props: simpleResumeProps) {
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
						<ResumeEvents title="Education" data={props.data.items[0].properties.education} dateFormat="MM/yyyy" showDate={true} />
					</div>
					<div className="p_skills">
						<ResumeSkills data={props.data} />
					</div>
				</div>
				<div className="grid9 bigpad">
					<ResumeSummary data={props.data} />
					<ResumeQualifications data={props.data} />
					<ResumeEvents title="Work History" data={props.data.items[0].properties.experience} dateFormat="MM/yyyy" showDate={true} />
					<ResumeEvents title="Volunteer Work" data={props.data.items[0].properties.volunteer} dateFormat="MM/yyyy" showDate={true} />
					<ResumeEvents title="Certifications" data={props.data.items[0].properties.certifications} dateFormat="MM/yyyy" showDate={true} />

				</div>
			</div>
		</section>
	);
}

export function ResumeName(props: simpleResumeProps) {
	var myName = props.data.items[0].properties.contact[0].properties.name;
	return (
		<Fragment>
			<h1 className="p_name">{myName}</h1>
		</Fragment>
	);
}

export function ResumeContact(props: simpleResumeProps) {
	var myContact = props.data.items[0].properties.contact[0];
	return (
		<Fragment>
			<h2>Contact Information</h2>
			<ul>
				<li><span className="p_email">{myContact.properties.email[0]}</span></li>
				<li><span className="p_street_address">{myContact.properties.adr[0].properties["street_address"]}, </span>
					<span className="p_locality">{myContact.properties.adr[0].properties.locality}, </span>
					<span className="p_region">{myContact.properties.adr[0].properties.region} </span>
					<span className="p_postal_code">{myContact.properties.adr[0].properties["postal_code"]}</span></li>
				<li><span className="p_tel">{myContact.properties.tel[0]}</span></li>
				<li><span className="p_url"><a href={myContact.properties.url[0]}>{myContact.properties.url[0]}</a></span></li>
			</ul>
		</Fragment>
	);
}


export function ResumeEvents(props: resumeProps) {
	var myElems = [];
	var myEvents = props.data;
	for (var iKey in myEvents) {
		var myEvent = myEvents[iKey];
		var myStartDate = isValidDate(myEvent.properties.start[0]) ? format(new Date(myEvent.properties.start[0]), props.dateFormat) : myEvent.properties.start[0] ;
		var myEndDate = isValidDate(myEvent.properties.end[0]) ? format(new Date(myEvent.properties.end[0]), props.dateFormat) : myEvent.properties.end[0] ;
		var myLocation = myEvent.properties.location[0].properties;
		var myElemDt = <span>
			{ (myStartDate) ? <span className="dt_start">{myStartDate} - </span> : null }
			{ (myEndDate) ? <span className="dt_end">{myEndDate} : </span> : null }
		</span>;
		var myElem = <li key={iKey}>
			{ (props.showDate == true) ? myElemDt : null }
			{ (myLocation && myLocation["job-title"]) ? (<span className="p_job_title">{myLocation["job-title"]}, </span> ) : null }
			<span className="p_org">{myLocation.org}, </span>	
			<span className="p_locality">{myLocation.locality}, </span>
			<span className="p_region">{myLocation.region} </span>
		</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>{ props.title }</h2>
			<ul>{ myElems }</ul>
		</Fragment>
	);
}

export function ResumeQualifications(props: simpleResumeProps) {
	var myElems = [];
	var myQual = props.data.items[0].properties.qualifications;
	for (var iKey in myQual) {
		var qual = myQual[iKey];
		var myElem = <h3 key={iKey}>{iKey}</h3>;
		var quals = qual.map((qualItem: any, iKey: string) =>
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

export function ResumeSkills (props: simpleResumeProps) {
	var myElems = [];
	var mySkills = props.data.items[0].properties.skills[0];
	for (var skill in mySkills) {
		var myElem = <h3 key={"c-" + skill} className="p_skill_category">{skill} : </h3>;
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

export function ResumeSummary (props: simpleResumeProps) {
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


/* 
Resume Microformat - https://microformats.org/wiki/h-resume
*/