import React from 'react';
import renderer from 'react-test-renderer';
import Callout, { CalloutHeader, CalloutSmall, CalloutHeaderSmall } from '../components/callout/callout';

const calloutProps = {
	url: 'gallery.html',
	img: 'https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg',
	title: 'Photo Gallery',
	content: 'A carousel of some of my best photographs throughout my life. They are primarily landscape photographs, macro photographs, and travel photographs. The carousel was built using the Galleria jQuery plugin. You can click on the left or right arrows to navigate, or swipe on a touch enabled device.',
	layout: 'vertical',
};

describe('Callout', () => {
	test('Callout snapshot renders', () => {
		const cCallout = renderer.create(<Callout url={calloutProps.url} img={calloutProps.img} title={calloutProps.title} content={calloutProps.content} />);
		const tree = cCallout.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CalloutHeader snapshot renders', () => {
		const cCalloutHeader = renderer.create(<CalloutHeader title={calloutProps.title} />);
		const tree = cCalloutHeader.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CalloutSmall snapshot renders', () => {
		const cCalloutSmall = renderer.create(<CalloutSmall url={calloutProps.url} img={calloutProps.img} title={calloutProps.title} />);
		const tree = cCalloutSmall.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CalloutHeaderSmall snapshot renders', () => {
		const cCalloutHeaderSmall = renderer.create(<CalloutHeaderSmall title={calloutProps.title} />);
		const tree = cCalloutHeaderSmall.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
