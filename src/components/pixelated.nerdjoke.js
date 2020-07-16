import React, { Component } from "react";
import { getXHRData, generateURL  } from "./pixelated.api.js";
import "../css/pixelated.nerdjoke.css";


export default class NerdJoke extends Component {

	constructor (props) {
		super(props);
		this.state = {
			joke: {
				question: "",
				answer: ""
			}
		};
	}

	loadJoke = () => {
		var myURL = "https://vvqyc1xpw6.execute-api.us-east-2.amazonaws.com/dev/nerdjokes?";
		var myURLProps = { command: "%2Fnerdjokes", text: "getjokejson" };
		var myMethod = "GET";
		getXHRData(generateURL(myURL, myURLProps), myMethod, (jokeData) => {
			var myJokeData = jokeData;
			this.setState({ joke: myJokeData });
		}); 
	}

	componentDidMount(){
		this.loadJoke();
		setInterval(this.loadJoke, 15000);
	}

	render () {
    	return (
    		<div className="nerdjoke grid12">
    			<div>
					<span>Q: </span>
					<span> { this.state.joke.question } </span>
				</div>
    			<div>
					<span>A: </span>
					<span> { this.state.joke.answer } </span>
				</div>
    		</div>
    	);
    }
}