import React, { Component } from "react";

import LayoutAlfa from './pages/layouts/pixelated.layout.alfa'
import LayoutBravo from './pages/layouts/pixelated.layout.bravo'
import LayoutCharlie from './pages/layouts/pixelated.layout.charlie'
// import routes from "./data/pixelated.routing.json"
import routes from './data/pixelated.routing.json'


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
		// const LazyComponent = lazy(() => import(`${__dirname}${this.props.variantPath}`))
		/* console.log(this.props.variantName)
		console.log(this.variants)
		console.log(this.variants[this.props.variantName])
		const LazyComponent = lazy(() => import('' + (this.variants[this.props.variantName])))
		console.log(LazyComponent)
		return (
			<Suspense fallback="Loading...">
				<LazyComponent routes={this.props.routes} />
			</Suspense>
		) */
		const variantComponent = this.variants[this.state.variantName]
		return variantComponent
	}
}
