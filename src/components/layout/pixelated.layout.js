import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LayoutAlfa } from './pixelated.layout.alfa'
import { LayoutBravo } from './pixelated.layout.bravo'
import { LayoutCharlie } from './pixelated.layout.charlie'
// import './pixelated.layout.less'

export class Layout extends Component {
	static propTypes = {
		variant: PropTypes.string.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {
			variant: this.props.variant
		}
		this.layoutMap = {
			alfa: LayoutAlfa,
			bravo: LayoutBravo,
			charlie: LayoutCharlie
		}
	}

	render () {
		const MyLayout = this.layoutMap[this.props.variant]
		return (<MyLayout />)
		/*
		let myLayout
		console.log(this.state.variant)
		switch (this.state.variant) {
		case 'Alfa': myLayout = <LayoutAlfa changeLayoutVariant={this.changeLayoutVariant} />; break
		case 'Bravo': myLayout = <LayoutBravo changeLayoutVariant={this.changeLayoutVariant} />; break
		case 'Charlie': myLayout = <LayoutCharlie changeLayoutVariant={this.changeLayoutVariant} />; break
		default: myLayout = <LayoutAlfa changeLayoutVariant={this.changeLayoutVariant} />; break
		}
		return myLayout
		*/
	}
}
