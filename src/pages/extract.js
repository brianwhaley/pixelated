import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormExtract, FormExtractUI } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.form.css";

// https://www.marriott.com/loyalty/createAccount/createAccountPage1.mi
// https://www.google.com
// https://www.hilton.com/en/hilton-honors/join/
// https://www.oakleyforum.com/register/?accountType=1

// https://www.united.com/en/us/account/enroll/profile
// https://online.citi.com/US/ag/cards/application?app=UNSOL&HKOP=56bf1cda41c07bbde9e50eb5f6695862a9869b39f65b7e7e22c94d4d88b4bf86&ID=3000&ProspectID=PSSw2hLccokgvvtmKZr7sKljVz8zxPRc&intc=1~7~50~5~LOBA~ViewAllCards~Pos1CMSDefaultOffer&cmv=283&pid=089&walletSegment=C202_00&rCode=I000&afc=135&adobe_mc=MCMID%3D01971878768967143646306741696391455003,MCAID%3D31BF2CFF4A2587FE-4000111F553C9BDE
// https://www.kroger.com/account/create/
// https://www.delta.com/join-skymiles/

export default class Extract extends Component {

	static propTypes = {
		url: PropTypes.string
	};

	constructor (props) {
		super(props);
		this.state = {
			url : ""
		};
		this.setURL = this.setURL.bind(this);
		this.FormExtractElement = React.createRef();
	}

	setURL = (sentURL) => {
		this.FormExtractElement.current.onUpdate("");
		this.setState({url: sentURL});
		this.FormExtractElement.current.onUpdate(sentURL);
	};

	render() {
		return (
			<div className="section-container">
				<FormExtractUI callback={this.setURL} />
				<br /><hr /><br />
				<FormExtract url={this.state.url} ref={this.FormExtractElement} />
			</div>
		);
	}
}
