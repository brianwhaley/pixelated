"use client";

import React from "react"

import { ResumeName, ResumeContact, ResumeQualifications, 
	ResumeSkills, ResumeSummary, ResumeEvents } from "@brianwhaley/pixelated-components";
import ResumeData from "@/app/data/resume.json";

/* 
import ReferencesData from "@/app/data/references.json";
<ResumeReferences title="References" data={ReferencesData.items[0].properties.references} collapsible={true} />
*/

export default function Resume() {
	return (
      	<section id="resume-section">
			<div className="section-container">
				<div className="p_resume" >
					<div className="p_name grid12">
						<ResumeName data={ResumeData.items[0].properties.name} />
					</div>
					<div className="grid3 bigpad divider">
						<div className="p_contact">
							<ResumeContact title="Contact Information" data={ResumeData.items[0].properties.contact} />
						</div>
						<div className="p_education">
							<ResumeEvents title="Education" data={ResumeData.items[0].properties.education} dateFormat="MM/yyyy" collapsible={false} />
						</div>
						<div className="p_skills">
							<ResumeSkills title="Skills" data={ResumeData.items[0].properties.skills} />
						</div>
					</div>
					<div className="grid9 bigpad">
						<ResumeSummary title="Professional Summary" data={ResumeData.items[0].properties.summary} />
						<ResumeQualifications title="Professional Qualifications" data={ResumeData.items[0].properties.qualifications} />
						<ResumeEvents title="Work History" data={ResumeData.items[0].properties.experience} dateFormat="MM/yyyy" collapsible={false} />
						<ResumeEvents title="Volunteer Work" data={ResumeData.items[0].properties.volunteer} dateFormat="MM/yyyy" collapsible={true} />
						<ResumeEvents title="Certifications" data={ResumeData.items[0].properties.certifications} dateFormat="MM/yyyy" collapsible={true} />
						<ResumeEvents title="Training & Conferences" data={ResumeData.items[0].properties.training} dateFormat="MM/dd/yyyy" collapsible={true} />
						<ResumeEvents title="Honors & Awards" data={ResumeData.items[0].properties.awards} dateFormat="MM/yyyy" collapsible={true} />
					</div>
				</div>
			</div>
		</section>
  	);
}
