import React, { Component, Fragment } from 'react'

export class LayoutCharlie extends Component {
	constructor (props) {
		super(props)
		this.state = {
			variant: 'charlie'
		}
	}

	render () {
		return (
			<Fragment>
				<main className="grid12">
					<h1>MAIN</h1>
				</main>
			</Fragment>
		)
	}
}
