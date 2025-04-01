
import React, { Fragment } from "react";
import { format } from "date-fns";
import "./pixelated.resume.css";

function isValidDate(date: string) {
	return !Number.isNaN(new Date(date).getTime());
}

function isStr(str: string) {
	const myStr = String(str).trim()
	return myStr != null && myStr !== "" && myStr.length > 0 && typeof myStr !== 'undefined';
}

// type IObj = { [key: string]: any }

const defaultDateFormat = 'MM/yyyy';
type resumeProps = {
	title: string
	data: any
	dateFormat?: string
	collapsible?: boolean
}

type simpleResumeProps = {
	data: any
}


export function Resume (props: simpleResumeProps) {
	return (
		<section className="p_resume" id="resume-section">
			<div className="section-container">
				<div className="p_name grid12">
					<ResumeName data={props.data.items[0].properties.name} />
				</div>
				<div className="grid3 bigpad divider">
					<div className="p_contact">
						<ResumeContact title="Contact Information" data={props.data.items[0].properties.contact} />
					</div>
					<div className="p_education">
						<ResumeEvents title="Education" data={props.data.items[0].properties.education} dateFormat="MM/yyyy" collapsible={false} />
					</div>
					<div className="p_skills">
						<ResumeSkills title="Skills" data={props.data.items[0].properties.skills} />
					</div>
				</div>
				<div className="grid9 bigpad">
					<ResumeSummary title="Professional Summary" data={props.data.items[0].properties.summary} />
					<ResumeQualifications title="Professional Qualifications" data={props.data.items[0].properties.qualifications} />
					<ResumeEvents title="Work History" data={props.data.items[0].properties.experience} dateFormat="MM/yyyy" collapsible={false} />
					<ResumeEvents title="Volunteer Work" data={props.data.items[0].properties.volunteer} dateFormat="MM/yyyy" collapsible={true} />
					<ResumeEvents title="Certifications" data={props.data.items[0].properties.certifications} dateFormat="MM/yyyy" collapsible={true} />
					<ResumeEvents title="Training & Conferences" data={props.data.items[0].properties.training} dateFormat="MM/dd/yyyy" collapsible={true} />
					<ResumeEvents title="Honors & Awards" data={props.data.items[0].properties.awards} dateFormat="MM/yyyy" collapsible={true} />
					<ResumeReferences title="References" data={props.data.items[0].properties.references} collapsible={true} />
					</div>
			</div>
		</section>
	);
}

export function ResumeName(props: simpleResumeProps) {
	const myName = props.data[0];
	return (
		<Fragment>
			<h1 className="p_name">{myName}</h1>
		</Fragment>
	);
}

export function ResumeContact(props: resumeProps) {
	const myContact = props.data[0];
	return (
		<Fragment>
			<h2>{ props.title }</h2>
			<ul>
				<li><span className="p_email">{myContact?.properties.email[0]}</span></li>
				<li><span className="p_street_address">{myContact?.properties.adr[0].properties["street-address"]}, </span>
					<span className="p_locality">{myContact?.properties.adr[0].properties.locality}, </span>
					<span className="p_region">{myContact?.properties.adr[0].properties.region} </span>
					<span className="p_postal_code">{myContact?.properties.adr[0].properties["postal-code"]}</span></li>
				<li><span className="p_tel">{myContact?.properties.tel[0]}</span></li>
				<li><span className="p_url"><a href={myContact?.properties.url[0]}>{myContact?.properties.url[0]}</a></span></li>
			</ul>
		</Fragment>
	);
}


export function ResumeEvents(props: resumeProps) {
	const myElems = [];
	const myEvents = props.data;
	for (const iKey in myEvents) {
		// PRE-LOAD SOME VALUES
		const myEvent = myEvents[iKey];
		const myStartDate = isValidDate(myEvent.properties.start[0]) ? format(new Date(myEvent.properties.start[0]), props.dateFormat || defaultDateFormat) : myEvent.properties.start[0] ;
		const myEndDate = isValidDate(myEvent.properties.end[0]) ? format(new Date(myEvent.properties.end[0]), props.dateFormat || defaultDateFormat) : myEvent.properties.end[0] ;
		const myLocation = myEvent.properties.location[0].properties;
		const myElemDt = <span>
			{ (myStartDate) ? <span className="dt_start">{myStartDate}</span> : null }
			{ (myStartDate && myEndDate) ? <span className="dt_start"> - </span> : null }
			{ (myEndDate) ? <span className="dt_end">{myEndDate}</span> : null }
			<span> : </span>
		</span>;
		// CREATE THE NEW ELEMENT
		const myElem = <li key={iKey}>
			{ (props.dateFormat) ? myElemDt : null }
			{ (myLocation && myLocation["job-title"]) ? (<span className="p_job_title">{myLocation["job-title"]}, </span> ) : null }
			<span className="p_org">{myLocation.org}</span>	
			{ (isStr(myLocation.locality)) ? <span className="p_locality">, {myLocation.locality}</span> : null }
			{ (isStr(myLocation.region)) ? <span className="p_region">, {myLocation.region} </span> : null }
		</li>;
		// ADD TO THE ARRAY
		myElems.push(myElem);
	}
	if(props.collapsible && props.collapsible == true) {
		return (
			<Fragment>
				<details>
					<summary><h2>{ props.title }</h2></summary>
					<ul>{ myElems }</ul>
				</details>
			</Fragment>
		)
	} else {
		return (
			<Fragment>
				<h2>{ props.title }</h2>
				<ul>{ myElems }</ul>
			</Fragment>
		)
	}
}

export function ResumeQualifications(props: resumeProps) {
	const myElems = [];
	const myQual = props.data;
	for (const iKey in myQual) {
		const qual = myQual[iKey];
		const myElem = <h3 key={iKey}>{iKey}</h3>;
		const quals = qual.map((qualItem: any, iKey: string) =>
			<li key={"i" + iKey} className="p_qualification">{qualItem}</li>
		);
		myElems.push(myElem);
		myElems.push(<ul key={"q-" + iKey}>{quals}</ul>);
	}
	return (
		<Fragment>
			<h2>{ props.title }</h2>
			{myElems}
		</Fragment>
	);
}

export function ResumeSkills (props: resumeProps) {
	const myElems = [];
	const mySkills = props.data[0];
	for (const skill in mySkills) {
		const myElem = <h3 key={"c-" + skill} className="p_skill_category">{skill} : </h3>;
		myElems.push(myElem);
		const myElem2 = <span key={"s-" + skill} className="p_skill">{mySkills[skill]}<br /></span>;
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

export function ResumeSummary (props: resumeProps) {
	const myElems = [];
	const mySummary = props.data;
	for (const iKey in mySummary) {
		const summary = mySummary[iKey];
		const myElem = <li key={iKey}>{summary}</li>;
		myElems.push(myElem);
	}
	return (
		<Fragment>
			<h2>Professional Summary</h2>
			<ul className="p_summary">{myElems}</ul>
		</Fragment>
	);
}

export function ResumeReferences (props: resumeProps) {
	const myElems = [];
	const myReferences = props.data;
	for (const iKey in myReferences) {
		const myReference = myReferences[iKey];
		// const myElem = <li key={iKey}>{myReference[iKey]}</li>;
		const myElem = <ResumeReference data={myReference} key={iKey} />;
		myElems.push(myElem);
	}
	if(props.collapsible && props.collapsible == true) {
		return (
			<Fragment>
				<details>
					<summary><h2>{ props.title }</h2></summary>
					<div>{ myElems }</div>
				</details>
			</Fragment>
		)
	} else {
		return (
			<Fragment>
				<h2>{ props.title }</h2>
				<div>{ myElems }</div>
			</Fragment>
		)
	}
}

export function ResumeReference (props: simpleResumeProps) {
	const myReference = props.data;
	return (
		<Fragment>
			<div>{myReference.properties.name[0]}, {myReference.properties.locality[0]}, {myReference.properties.region[0]}</div>
			<div>{myReference.properties["job-title"][0]}, {myReference.properties.org[0]}</div>
			<div><a href={`mailto:${myReference.properties.email[0]}`}>{myReference.properties.email[0]}</a></div>
			<div><a href={`tel:${myReference.properties.tel[0]}`}>{myReference.properties.tel[0]}</a></div>
			<hr />
		</Fragment>
	);
}


/* 
Resume Microformat - https://microformats.org/wiki/h-resume
Details Summary Expand Collapse - https://www.w3schools.com/tags/tag_details.asp
*/