import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getXHRData, generateURL } from '../utilities/pixelated.api';
import './pixelated.nerdjoke.css';
import '../../css/pixelated.grid.scss';

/* 
TODO: #21 NerdJoke Component - Convert to TypeScript
*/

const debug = false;

export class NerdJoke extends Component {
	constructor (props) {
		super(props);
		this.TIME_LIMIT = 15;
		this.timePassed = 0;
		this.timePaused = false;
		this.timeLeft = this.TIME_LIMIT;
		this.timerInterval = null;
		this.jokeInterval = null;
		this.state = {
			joke: {
				question: '',
				answer: ''
			}
		};
	}

	loadJoke = () => {
		if (debug) console.log("Loading Joke");
		this.timePassed = 0;
		this.timeLeft = this.TIME_LIMIT;
		this.timerInterval = null;

		clearInterval(this.jokeInterval);
		this.jokeInterval = setInterval(() => {
			if (!this.timePaused) {
				this.loadJoke();
			}
		}, this.TIME_LIMIT * 1000);

		const myURL = 'https://vvqyc1xpw6.execute-api.us-east-2.amazonaws.com/prod/nerdjokes?';
		const myURLProps = { command: '%2Fnerdjokes', text: 'getjokejson' };
		const myMethod = 'GET';
		getXHRData(generateURL(myURL, myURLProps), myMethod, (jokeData) => {
			const myJokeData = jokeData;
			this.setState({ joke: myJokeData });
		});
	};

	formatTimeLeft(time) {
		if (debug) console.log("Formatting Time Left");
		const minutes = Math.floor(time / 60);
		let seconds = time % 60;
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return `${minutes}:${seconds}`;
	};

	startTimer() {
		if (debug) console.log("Starting Timer");
		this.timerInterval = setInterval(() => {
			if (!this.timePaused) {
				this.timePassed = this.timePassed += 1;
				this.timeLeft = this.TIME_LIMIT - this.timePassed + 1;
				const myWidth = (((1 / this.TIME_LIMIT) * this.timeLeft) * 100) + '%';
				document.getElementById('jokeTimerLabel').innerHTML = this.formatTimeLeft(this.timeLeft);
				document.getElementById('jokeTimerPathElapsed').style.width = myWidth;
			}
		}, 1000);
	};

	pauseTimer() {
		if (debug) console.log("Pausing Timer");
		this.timePaused = !this.timePaused;
	};

	componentDidMount () {
		if (debug) console.log("Component is Mounted");
		this.loadJoke();
		this.startTimer();
	}

	render () {
		return (
			<div className="nerdJoke">
				<div className="row-12col">
					<div className="grid-s1-e4">
						<div className="left">
							<JokeButton
								clickFunction={ this.pauseTimer }
								buttonText="Pause ||  / Play >" />
						</div>
					</div>
					<div className="grid-s9-e4">
						<div className="right">
							<JokeButton
								clickFunction={ this.loadJoke }
								buttonText="Next Joke ->" />
						</div>
					</div>
					<div className="jokeTimer grid-s1-e12">
						<div className="row-12col">
							<div className="grid-s1-e10">
								<svg className="jokeTimerSvg" xmlns="http://www.w3.org/2000/svg">
									<rect id="jokeTimerPathElapsed"/>
								</svg>
							</div>
							<div className="grid-s11-e2 center" id="jokeTimerLabel">
								{this.formatTimeLeft(this.timeLeft)}
							</div>
						</div>
					</div>
					<div className="jokeText grid-s1-e12">
						<div>
							<span className="label">Q: </span>
							<span className="question"> { this.state.joke.question } </span>
						</div>
						<div>
							<span className="label">A: </span>
							<span className="answer"> { this.state.joke.answer } </span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/* ========== JOKE BUTTON ========== */
function JokeButton(props) {
	return (
		<div className={'jokeButton' }
			onClick={ props.clickFunction }>
			{ props.buttonText }
		</div> 
	);
}
JokeButton.propTypes = {
	clickFunction: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired
};
