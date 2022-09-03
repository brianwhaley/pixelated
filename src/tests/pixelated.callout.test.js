
import React from "react";
import renderer from "react-test-renderer";
import Callout, { CalloutHeader, CalloutRoundSm, CalloutRoundTiny } from "./pixelated.callout";

const calloutProps = {
	url: "gallery.html",
	img: "https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg",
	title: "Photo Gallery",
	content: "A carousel of some of my best photographs throughout my life. They are primarily landscape photographs, macro photographs, and travel photographs. The carousel was built using the Galleria jQuery plugin. You can click on the left or right arrows to navigate, or swipe on a touch enabled device.",
	direction: "vertical",
	columnCount: "3"
};

describe("Callout", () => {
	test("Callout snapshot renders", () => {
		const cCallout = renderer.create(<Callout url={calloutProps.url} img={calloutProps.img} title={calloutProps.title} content={calloutProps.content} />);
		const tree = cCallout.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("CalloutHeader snapshot renders", () => {
		const cCalloutHeader = renderer.create(<CalloutHeader title={calloutProps.title} />);
		const tree = cCalloutHeader.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("CalloutRoundSm snapshot renders", () => {
		const cCalloutRoundSm = renderer.create(<CalloutRoundSm url={calloutProps.url} img={calloutProps.img} title={calloutProps.title} />);
		const tree = cCalloutRoundSm.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("CalloutRoundTiny snapshot renders", () => {
		const cCalloutRoundTiny = renderer.create(<CalloutRoundTiny url={calloutProps.url} img={calloutProps.img} title={calloutProps.title} />);
		const tree = cCalloutRoundTiny.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
