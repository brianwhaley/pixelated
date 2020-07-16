import React, { Component } from "react";
import { getXHRData, generateURL  } from "./pixelated.api.js";
import PropTypes from "prop-types";
import "../css/pixelated.nerdjoke.css";


export default class NerdJoke extends Component {

	componentDidMount () {
		var myURL = "https://vvqyc1xpw6.execute-api.us-east-2.amazonaws.com/dev/nerdjokes";
		var myURLProps = { command: "%2Fnerdjokes", text: "getjokejson" };
		var myMethod = "POST";
		getXHRData(generateURL(myURL, myURLProps), myMethod, (jokeData) => {
			this.setState({ joke: jokeData });
			console.log(jokeData);
		}); 
	}

	render () {
    	return (
    		<div className="nerdjoke grid12">
    			<div>
					<span>Q: </span>
					<span> Question Goes Here</span>
				</div>
    			<div>
					<span>A: </span>
					<span> Answer Goes Here</span>
				</div>
    		</div>
    	);
    }
}