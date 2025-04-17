import React from 'react';
import renderer from 'react-test-renderer';
import { ResumeName, ResumeContact, ResumeEducation, ResumeQualifications, ResumeWorkHistory, ResumeVolunteer, ResumeCertifications, ResumeSkills, ResumeSummary } from '../components/resume/pixelated.resume';
import ResumeData from '../data/resume.json';

describe('Resume', () => {
	test('Resume Name renders', () => {
		const cResumeName = renderer.create(<ResumeName data={ResumeData} />);
		const tree = cResumeName.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Contact renders', () => {
		const cResumeContact = renderer.create(<ResumeContact data={ResumeData} />);
		const tree = cResumeContact.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Education renders', () => {
		const cResumeEducation = renderer.create(<ResumeEducation data={ResumeData} />);
		const tree = cResumeEducation.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Skills renders', () => {
		const cResumeSkills = renderer.create(<ResumeSkills data={ResumeData} />);
		const tree = cResumeSkills.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Summary renders', () => {
		const cResumeSummary = renderer.create(<ResumeSummary data={ResumeData} />);
		const tree = cResumeSummary.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Qualifications renders', () => {
		const cResumeQualifications = renderer.create(<ResumeQualifications data={ResumeData} />);
		const tree = cResumeQualifications.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Work History renders', () => {
		const cResumeWorkHistory = renderer.create(<ResumeWorkHistory data={ResumeData} />);
		const tree = cResumeWorkHistory.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Volunteer renders', () => {
		const cResumeVolunteer = renderer.create(<ResumeVolunteer data={ResumeData} />);
		const tree = cResumeVolunteer.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Resume Certifications renders', () => {
		const cResumeCertifications = renderer.create(<ResumeCertifications data={ResumeData} />);
		const tree = cResumeCertifications.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
