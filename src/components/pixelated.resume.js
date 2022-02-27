import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

/* function isDate (dt) { return Object.prototype.toString.call(dt) === '[object Date]'; } */
function pad (s) { return (s < 10) ? "0" + s : s; }
function mmYYYY (dt) {
	var d = new Date(dt);
	// alert(d);
	return Number.isNaN(d.getMonth()) ? dt : [pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export class ResumeName extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myName = this.props.data.items[0].properties.contact[0].properties.name;
		return (
			<Fragment>
				<h1 className="p-name">{myName}</h1>
			</Fragment>
		);
	}
}

export class ResumeContact extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myContact = this.props.data.items[0].properties.contact[0];
		return (
			<Fragment>
				<h2>Contact Information</h2>
				<ul>
					<li><span className="p-email">{myContact.properties.email[0]}</span></li>
					<li><span className="p-street-address">{myContact.properties.adr[0].properties["street-address"]}, </span>
						<span className="p-locality">{myContact.properties.adr[0].properties.locality}, </span>
						<span className="p-region">{myContact.properties.adr[0].properties.region} </span>
						<span className="p-postal-code">{myContact.properties.adr[0].properties["postal-code"]}</span></li>
					<li><span className="p-tel">{myContact.properties.tel[0]}</span></li>
					<li><span className="p-url"><a href={myContact.properties.url[0]}>{myContact.properties.url[0]}</a></span></li>
				</ul>
			</Fragment>
		);
	}
}

export class ResumeEducation extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var myEducation = this.props.data.items[0].properties.education;
		for (var iKey in myEducation) {
			var ed = myEducation[iKey];
			var myEdLocation = ed.properties.location[0].properties;
			var myElem = <li key={iKey}>
				<span className="dt-end">{mmYYYY(ed.properties.end)} - </span>
				<span className="p-name">{ed.properties.name}, </span>
				<span className="p-org">{myEdLocation.org}, </span>
				<span className="p-locality">{myEdLocation.locality}, </span>
				<span className="p-region">{myEdLocation.region} </span>
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
}

export class ResumeQualifications extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var myQual = this.props.data.items[0].properties.qualifications;
		for (var iKey in myQual) {
			var qual = myQual[iKey];
			var myElem = <h3 key={iKey}>{iKey}</h3>;
			var quals = qual.map((qualItem, iKey) =>
				<li key={"i" + iKey} className="p-qualification">{qualItem}</li>
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
}

export class ResumeWorkHistory extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var myWork = this.props.data.items[0].properties.experience;
		for (var iKey in myWork) {
			var work = myWork[iKey];
			var myWorkLocation = work.properties.location[0].properties;
			var myElem = <li key={iKey}>
				<span className="dt-start">{mmYYYY(work.properties.start)} - </span>
				<span className="dt-end">{mmYYYY(work.properties.end)} : </span>
				<span className="p-job-title">{myWorkLocation["job-title"]}, </span>
				<span className="p-org">{myWorkLocation.org}, </span>
				<span className="p-locality">{myWorkLocation.locality}, </span>
				<span className="p-region">{myWorkLocation.region} </span>
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
}

export class ResumeVolunteer extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var myVolunteer = this.props.data.items[0].properties.volunteer;
		for (var iKey in myVolunteer) {
			var vol = myVolunteer[iKey];
			var myVolLocation = vol.properties.location[0].properties;
			var myElem = <li key={iKey}>
				<span className="dt-start">{mmYYYY(vol.properties.start)} - </span>
				<span className="dt-end">{mmYYYY(vol.properties.end)} : </span>
				<span className="p-job-title">{myVolLocation["job-title"]}, </span>
				<span className="p-org">{myVolLocation.org}, </span>
				<span className="p-locality">{myVolLocation.locality}, </span>
				<span className="p-region">{myVolLocation.region} </span>
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
}

export class ResumeCertifications extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var myCerts = this.props.data.items[0].properties.certifications;
		for (var iKey in myCerts) {
			var cert = myCerts[iKey];
			var myElem = <li key={iKey}>
				<span className="dt-start">{mmYYYY(cert.properties.start)} - </span>
				<span className="p-name">{cert.properties.name}, </span>
				<span className="p-location">{cert.properties.location}</span>
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
}

export class ResumeSkills extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var mySkills = this.props.data.items[0].properties.skills[0];
		for (var skill in mySkills) {
			var myElem = <h3 key={"c-" + skill} className="p-skill-category">{skill} : </h3>;
			myElems.push(myElem);
			var myElem2 = <span key={"s-" + skill} className="p-skill">{mySkills[skill]}<br /></span>;
			myElems.push(myElem2);
		}
		return (
			<Fragment>
				<h2>Skills</h2>
				<div className="p-skills">
					{ myElems }
				</div>
			</Fragment>
		);
	}
}

export class ResumeSummary extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render () {
		var myElems = [];
		var mySummary = this.props.data.items[0].properties.summary;
		for (var summary in mySummary) {
			var myElem = <li key={summary}>{mySummary[summary]}</li>;
			myElems.push(myElem);
		}
		return (
			<Fragment>
				<h2>Professional Summary</h2>
				<ul className="p-summary">{ myElems }</ul>
			</Fragment>
		);
	}
}
