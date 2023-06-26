import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyRoutes from './pixelated.myroutes'

import Nav from '../elements/nav'
import Header from '../elements/header'
import Hero from '../elements/hero'
import Search from '../elements/search'
import Footer from '../elements/footer'

export default class LayoutAlfa extends Component {
	static propTypes = {
		routes: PropTypes.array.isRequired
	}

	componentDidMount() {
	}

	render () {
		return (
			<Fragment>
				<header className="grid12">
					<div id="page-header" className="grid12 fixed-header">
						<Header />
					</div>
					<div id="fixed-header-spacer" className="grid12"></div>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Hero />}/>
							<Route path='/index.html' element={<Hero />}/>
						</Routes>
					</BrowserRouter>
					<div id="page-search" className="grid12 noMobile">
						<Search />
					</div>
				</header>
				<nav>
					<Nav />
				</nav>
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
