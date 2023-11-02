import React, { Component } from "react";

import LayoutAlfa from './pages/layouts/pixelated.layout.alfa'
import LayoutBravo from './pages/layouts/pixelated.layout.bravo'
import LayoutCharlie from './pages/layouts/pixelated.layout.charlie'
import { routes } from './pages/elements/pixelated.routing'


export default class App extends Component {

	constructor (props) {
		super(props)
		this.state = {
			variantName: 'alfa'
		};
		/* this.variants = {
			alfa: '../pages/layouts/pixelated.layout.alfa.js',
			bravo: '../pages/layouts/pixelated.layout.bravo.js',
			charlie: '../pages/layouts/pixelated.layout.charlie.js'
		} */
		this.variants = {
			alfa: <LayoutAlfa routes={routes} />,
			bravo: <LayoutBravo routes={routes} />,
			charlie: <LayoutCharlie routes={routes} />
		}
	}
	
	render () {
		const variantComponent = this.variants[this.state.variantName]
		return variantComponent
	}
}
