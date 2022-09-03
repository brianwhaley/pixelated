/* eslint sonarjs/no-collapsible-if: 0 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/pixelated.menu-accordion.css";

/* ========== MENU ========== */
export class Menu extends Component {
	static propTypes = {
		menuItems: PropTypes.object.isRequired
	};

	constructor (props) {
		super(props);
		this.state = {
			menuItems: [],
			left: -350
		};
		this.moveMenu = this.moveMenu.bind(this);
	}

	generateMenuItems () {
		var myItems = [];
		for (var itemKey in this.props.menuItems) {
			myItems.push(<MenuItem key={itemKey} name={itemKey} href={this.props.menuItems[itemKey]} />);
		}
		// this.setState({ menuItems: myItems })
		return myItems;
	}

	moveMenu () {
		if (this.state.left === 0) {
			this.setState({ left: -350 });
		} else {
			this.setState({ left: 0 });
		}
	}

	componentDidMount = () => {
		var menu = document.getElementById("accordion-menu");
		var menuBtn = document.getElementById("panel-menu-button");
		document.addEventListener("click", (event) => {
			var isClicked = ( menu.contains(event.target) || menuBtn.contains(event.target) );
			if (!isClicked) {
				if ( this.state.left === 0 ) this.moveMenu();
			}
		}, true );
	};
	
	componentWillUnmount () {
		window.removeEventListener("click", this.handleResize);
	}

	render () {
		var styles = { left: "0px" };
		styles.transition = "transform 0.5s ease-out 0.0s";
		styles.transform = "translateX(" + this.state.left + "px)";
		return (
			<div className="accordion-menu-wrapper" style={styles}>
				<div className="accordion-menu" id="accordion-menu">
					<ul className="grid12 clearfix">
						{ this.generateMenuItems() }
					</ul>
				</div>
			</div>
		);
	}
}

/* ========== MENU ITEM ========== */
export class MenuItem extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired
	};

	render () {
		return (
			<li><a href={this.props.href}>{this.props.name}</a></li>
		);
	}
}

/* ========== MENU BUTTON ========== */
export class MenuButton extends Component {
	slideMobilePanel () {
		window.myMenu.moveMenu();
	}

	render () {
		return (
			<div className="panel-menu-button pull-left" id="panel-menu-button" onClick={this.slideMobilePanel}>
				<img src="/images/mobile-menu2.png" alt="Mobile Menu"/>
			</div>
		);
	}
}
