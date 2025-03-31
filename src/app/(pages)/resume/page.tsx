"use client";

import React from "react"

import { ResumeName, ResumeContact, ResumeQualifications, 
	ResumeSkills, ResumeSummary, ResumeEvents } from "@/app/components/resume/pixelated.resume";
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
							<ResumeEvents title="Education" data={ResumeData.items[0].properties.education} dateFormat="MM/yyyy" showDate={true} />
						</div>
						<div className="p_skills">
							<ResumeSkills data={ResumeData} />
						</div>
					</div>
					<div className="grid9 bigpad">
						<ResumeSummary data={ResumeData} />
						<ResumeQualifications data={ResumeData} />
						<ResumeEvents title="Work History" data={ResumeData.items[0].properties.experience} dateFormat="MM/yyyy" showDate={true} />
						<ResumeEvents title="Volunteer Work" data={ResumeData.items[0].properties.volunteer} dateFormat="MM/yyyy" showDate={true} />
						<ResumeEvents title="Certifications" data={ResumeData.items[0].properties.certifications} dateFormat="MM/yyyy" showDate={true} />
						<ResumeEvents title="Training & Conferences" data={ResumeData.items[0].properties.training} dateFormat="MM/dd/yyyy" showDate={true} />
					</div>
				</div>
			</div>
		</section>
  	);
}
