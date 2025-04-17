"use client";

import React from "react";

import { ResumeName, ResumeContact, ResumeQualifications, ResumeSkills, 
	ResumeSummary, ResumeEvents, ResumeProjects, ResumeReferences } from "@brianwhaley/pixelated-components";
import ResumeData from "@/app/data/resume.json";
// import ReferencesData from '@/app/data/references.json';

// ResumeData.items[0].properties.references = ReferencesData.items[0].properties.references;

/* 
import ReferencesData from "@/app/data/references.json";
<ResumeReferences title="References" data={ReferencesData.items[0].properties.references} collapsible={true} />
*/

export default function Resume() {
	return (
      	<section className="p-resume" id="resume-section">
			<div className="section-container">
				<div className="p-name grid12">
					<ResumeName data={ResumeData.items[0].properties.name} />
				</div>
				<div className="grid3 bigpad divider">
					<div className="p-contact">
						<ResumeContact title="Contact Information" data={ResumeData.items[0].properties.contact} />
					</div>
					<div className="p-education">
						<ResumeEvents title="Education" data={ResumeData.items[0].properties.education} dateFormat="MM/yyyy" collapsible={false} />
					</div>
					<div className="p-skills">
						<ResumeSkills title="Skills" data={ResumeData.items[0].properties.skills} />
					</div>
				</div>
				<div className="grid9 bigpad">
					<div className="p-summary">
						<ResumeSummary title="Professional Summary" data={ResumeData.items[0].properties.summary} />
					</div>
					<div className="p-qualifications">
						<ResumeQualifications title="Professional Qualifications" data={ResumeData.items[0].properties.qualifications} />
					</div>
					<div className="p-experience">
						<ResumeEvents title="Work History" data={ResumeData.items[0].properties.experience} dateFormat="MM/yyyy" collapsible={false} />
					</div>
					<div className="p-projects">
						<ResumeProjects title="Projects" data={ResumeData.items[0].properties.experience} collapsible={true} />
					</div>
		
					<div className="p-volunteer">
						<ResumeEvents title="Volunteer Work" data={ResumeData.items[0].properties.volunteer} dateFormat="MM/yyyy" collapsible={true} />
					</div>
		
					<div className="p-certifications">
						<ResumeEvents title="Certifications" data={ResumeData.items[0].properties.certifications} dateFormat="MM/yyyy" collapsible={true} />
					</div>
					<div className="p-awards">
						<ResumeEvents title="Honors & Awards" data={ResumeData.items[0].properties.awards} dateFormat="MM/yyyy" collapsible={true} />
					</div>
		
					<div className="p-training">
						<ResumeEvents title="Training & Conferences" data={ResumeData.items[0].properties.training} dateFormat="MM/dd/yyyy" collapsible={true} />
					</div>
		
					<div className="p-references">
						<ResumeReferences title="References" data={ResumeData.items[0].properties.references} collapsible={true} />
					</div>
		
				</div>
			</div>
		</section>
  	);
}
