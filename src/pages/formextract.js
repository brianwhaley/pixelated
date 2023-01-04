import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormExtract, FormExtractUI, FormEngine } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.form.css";

// https://www.united.com/en/us/account/enroll/profile
// https://online.citi.com/US/ag/cards/application?app=UNSOL&HKOP=56bf1cda41c07bbde9e50eb5f6695862a9869b39f65b7e7e22c94d4d88b4bf86&ID=3000&ProspectID=PSSw2hLccokgvvtmKZr7sKljVz8zxPRc&intc=1~7~50~5~LOBA~ViewAllCards~Pos1CMSDefaultOffer&cmv=283&pid=089&walletSegment=C202_00&rCode=I000&afc=135&adobe_mc=MCMID%3D01971878768967143646306741696391455003,MCAID%3D31BF2CFF4A2587FE-4000111F553C9BDE
// https://www.kroger.com/account/create/
// https://www.delta.com/join-skymiles/

export default class FormExtractv2 extends Component {
	static propTypes = {
		url: PropTypes.string
	};
	constructor (props) {
		super(props);
		this.state = {
			url : "",
			formdata : {}
		};
		this.setParentState = this.setParentState.bind(this);
		this.setFormData = this.setFormData.bind(this);
	}
	setParentState = (parentState) => {
		this.setState({url: parentState.url});
		this.setState({html_paste: parentState.html_paste});
	};
	setFormData = (json) => {
		this.setState({formdata: json});
	};
	render() {
		return (
			<div>
				<div className="section-container">
					<FormExtractUI setParentState={this.setParentState} />
					<ul>Sample URLs : 
						<li>https://www.marriott.com/loyalty/createAccount/createAccountPage1.mi</li>
						<li>https://stackoverflow.com/users/signup</li>
						<li>https://www.google.com</li>
						<li>https://www.hilton.com/en/hilton-honors/join/</li>
						<li>https://www.oakleyforum.com/register/?accountType=1</li>
						<li>https://www.microfocus.com/selfreg/jsp/createAccount.jsp</li>
						<li>https://www.michaels.com/on/demandware.store/Sites-MichaelsUS-Site/default/Account-NewRegistration</li>
						<li>https://reg.usps.com/register</li>
					</ul>
				</div>

				<div className="section-container">
					<br /><br /><hr /><br /><br />
				</div>

				<div className="section-container">
					<FormExtract url={this.state.url} html_paste={this.state.html_paste} setFormData={this.setFormData} />
				</div>

				<div className="section-container">
					<br /><br /><hr /><br /><br />
				</div>

				<div className="section-container">
					<FormEngine formdata={this.state.formdata} />
				</div>
			</div>
		);
	}
}
