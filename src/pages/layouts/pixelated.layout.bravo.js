import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyRoutes from './pixelated.myroutes'

import Header from '../../pages/elements/header'
import Footer from '../../pages/elements/footer'

export default class LayoutBravo extends Component {
	static propTypes = {
		routes: PropTypes.array.isRequired
	}

	render () {
		return (
			<Fragment>
				<header className="grid12">
					<div id="page-header" className="grid12 fixed-header">
						<Header />
					</div>
					<div id="fixed-header-spacer" className="grid12"></div>
				</header>
				<main className="grid12">
					<MyRoutes />
				</main>
				<footer className="grid12">
					<Footer />
				</footer>
			</Fragment>
		)
	}
}
