import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/pixelated.menu.css';

/* ========== MENU ========== */
export default class Menu extends Component {
	static propTypes = {
		menuItems: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			menuItems: [],
			left: -350
		};
		this.moveMenu = this.moveMenu.bind(this);
	}

	generateMenuItems() {
		var myItems = [];
		for ( var itemKey in this.props.menuItems ) {
			myItems.push( <MenuItem key={itemKey} name={itemKey} href={this.props.menuItems[itemKey]} /> );
		}
		// this.setState({ menuItems: myItems })
		return myItems ;
	}

	moveMenu(){
		if (this.state.left === 0){
			this.setState({left: -350})
		} else {
			this.setState({left: 0})
		}
	}

	render(){
		var styles = { left: "0px" };
		styles.transition = "transform 1.0s ease-in-out 0.1s";
		styles.transform = "translateX(" + this.state.left + "px)";
		return (
			<div className="accordion-menu-wrapper" style={styles}>
				<div className="accordion-menu">
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
		name: PropTypes.string.isRequired ,
		href: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render(){
		return (
			<li><a href={this.props.href}>{this.props.name}</a></li>
		);
	}
}


/* ========== MENU BUTTON ========== */
export class MenuButton extends Component {
	static propTypes = {
	}
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	slideMobilePanel(){
			/* var myOffset = $('#panel-menu').offset().left;
			if(myOffset < 0 ) {
				$('#panel-menu').animate({ left: 0 }, 'slow', 'swing', function() {
					// $('#button').html('Close');
				});
			} else {
				$('#panel-menu').animate({ left: -350 }, 'slow', 'swing', function() {
					// $('#button').html('Menu');
				});
			} */
			window.myMenu.moveMenu();
	}

	render(){
		return (
			<div className="panel-menu-button pull-left" onClick={this.slideMobilePanel}>
				<img src="images/mobile-menu2.png" alt="Mobile Menu"/>
			</div>
		);
	}
}