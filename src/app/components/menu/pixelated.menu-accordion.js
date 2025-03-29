import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './pixelated.menu-accordion.css'

/* ========== MENU ========== */
export class MenuAccordion extends Component {
	static propTypes = {
		menuItems: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {
			menuItems: [],
			left: -350
		}
		this.moveMenu = this.moveMenu.bind(this)
	}

	generateMenuItems () {
		const myItems = []
		for (const itemKey in this.props.menuItems) {
			myItems.push(<MenuAccordionItem key={itemKey} name={itemKey} href={this.props.menuItems[itemKey]} />)
		}
		// this.setState({ menuItems: myItems })
		return myItems
	}

	moveMenu () {
		if (this.state.left === 0) {
			this.setState({ left: -350 })
		} else {
			this.setState({ left: 0 })
		}
	}

	componentDidMount = () => {
		const menu = document.getElementById('accordionMenu')
		const menuBtn = document.getElementById('panelMenuButton')
		document.addEventListener('click', (event) => {
			const isClicked = (menu.contains(event.target) || menuBtn.contains(event.target))
			if (!isClicked) {
				if (this.state.left === 0) this.moveMenu()
			}
		}, true)
	}

	componentWillUnmount () {
		window.removeEventListener('click', this.handleResize)
	}

	render () {
		const styles = { left: '0px' }
		styles.transition = 'transform 0.5s ease-out 0.0s'
		styles.transform = 'translateX(' + this.state.left + 'px)'
		return (
			<div className="accordionMenuWrapper" style={styles}>
				<div className="accordionMenu" id="accordionMenu">
					<ul className="grid12 clearfix">
						{ this.generateMenuItems() }
					</ul>
				</div>
			</div>
		)
	}
}

/* ========== MENU ITEM ========== */
export class MenuAccordionItem extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired
	}

	render () {
		return (
			<li><a href={this.props.href}>{this.props.name}</a></li>
		)
	}
}

/* ========== MENU BUTTON ========== */
export class MenuAccordionButton extends Component {
	slideMobilePanel () {
		window.myMenu.moveMenu()
	}

	render () {
		return (
			<div className="panelMenuButton pull-left" id="panelMenuButton" onClick={this.slideMobilePanel}>
				<img src="/images/mobile-menu2.png" alt="Mobile Menu"/>
			</div>
		)
	}
}
