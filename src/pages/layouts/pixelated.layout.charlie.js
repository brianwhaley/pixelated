import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyRoutes from './pixelated.myroutes'


export default class LayoutCharlie extends Component {
	static propTypes = {
		routes: PropTypes.array.isRequired
	}

	render () {
		return (
			<Fragment>
				<main className="grid12">
					<MyRoutes />
				</main>
			</Fragment>
		)
	}
}
