import React, { Component, Fragment } from 'react'

export class LayoutBravo extends Component {
	constructor (props) {
		super(props)
		this.state = {
			variant: 'bravo'
		}
		// this.props.changeLayoutVariant(this.state.variant)
	}

	render () {
		return (
			<Fragment>
				<header className="grid12">
					<h1>HEADER</h1>
				</header>
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
