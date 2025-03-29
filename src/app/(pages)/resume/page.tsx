"use client";

import React from "react"

import { ResumeName, ResumeContact, ResumeEducation, 
	ResumeQualifications, ResumeWorkHistory, ResumeVolunteer, 
	ResumeCertifications, ResumeSkills, ResumeSummary } from "@/app/components/resume/pixelated.resume";
import ResumeData from "@/app/data/resume.json";

export default function Resume() {
	return (
      	<section id="resume-section">
			<div className="section-container">
				<div className="p_resume" >
					<div className="p_name grid12">
						<ResumeName data={ResumeData} />
					</div>
					<div className="grid3 bigpad divider">
						<div className="p_contact">
							<ResumeContact data={ResumeData} />
						</div>
						<div className="p_education">
							<ResumeEducation data={ResumeData} dateFormat="MM/yyyy" showDate={true} />
						</div>
						<div className="p_skills">
							<ResumeSkills data={ResumeData} />
						</div>
					</div>
					<div className="grid9 bigpad">
						<ResumeSummary data={ResumeData} />
						<ResumeQualifications data={ResumeData} />
						<ResumeWorkHistory data={ResumeData} dateFormat="MM/yyyy" showDate={true} />
						<ResumeVolunteer data={ResumeData} dateFormat="MM/yyyy" showDate={true} />
						<ResumeCertifications data={ResumeData} dateFormat="MM/yyyy" showDate={true} />
					</div>
				</div>
			</div>
		</section>
  	);
}
