import React, { Component } from "react";
import { ResumeName, ResumeContact, ResumeEducation, ResumeQualifications, ResumeWorkHistory, ResumeVolunteer, ResumeCertifications, ResumeSkills, ResumeSummary } from "../components/pixelated.resume";
import "../css/pixelated.resume.css";
import ResumeData from "../data/resume.json";

export default class MyResume extends Component {
	render () {
		return (
			<section className="p-resume" id="resume-section">
				<div className="section-container">

					<div className="p-name grid12">
						<ResumeName data={ResumeData} />
					</div>

					<div className="grid3 bigpad divider">
						<div className="p-contact">
							<ResumeContact data={ResumeData} />
						</div>
						<div className="p-education">
							<ResumeEducation data={ResumeData} dateFormat="MM/yyyy" />
						</div>
						<div className="p-skills">
							<ResumeSkills data={ResumeData} />
						</div>
					</div>

					<div className="grid9 bigpad">
						<ResumeSummary data={ResumeData} />
						<ResumeQualifications data={ResumeData} />
						<ResumeWorkHistory data={ResumeData} dateFormat="MM/yyyy" />
						<ResumeVolunteer data={ResumeData} dateFormat="MM/yyyy" />
						<ResumeCertifications data={ResumeData} dateFormat="MM/yyyy" />
					</div>
				</div>
			</section>

		);
	}
}
