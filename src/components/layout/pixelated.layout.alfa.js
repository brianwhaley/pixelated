import React, { Component, Fragment } from 'react'

export class LayoutAlfa extends Component {
	constructor (props) {
		super(props)
		this.state = {
			variant: 'alfa'
		}
	}

	render () {
		return (
			<Fragment>
				<header className="grid12">
					<div id="page-header" className="grid12 fixed-header">
						<h1>HEADER</h1>
					</div>
					<div id="fixed-header-spacer" className="grid12"></div>
					<h1>HERO</h1>
					<div id="page-search" className="grid12 noMobile">
						<h1>SEARCH</h1>
					</div>
				</header>
				<nav>
					<h1>NAV</h1>
				</nav>
				<main className="grid12">
					<h1>MAIN</h1>
				</main>
				<footer className="grid12">
					<h1>FOOTER</h1>
				</footer>
			</Fragment>
		)
	}
}
