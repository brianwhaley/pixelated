import React from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import App from "./App";

describe("Recipe", () => {
	test("App snapshot renders", () => {
		const cApp = renderer.create(<App />);
		const tree = cApp.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	}); 
});
