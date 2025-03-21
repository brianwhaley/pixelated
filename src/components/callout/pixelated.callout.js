import React, { Component } from 'react'
import PropTypes from 'prop-types'
import px from './pixelated.callout.css'

/* ========== CALLOUT ========== */

export class Callout extends Component {
	static propTypes = {
		url: PropTypes.string,
		img: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		direction: PropTypes.string,
		columnCount: PropTypes.number
	}

	render () {
		const columnGridStyle = this.props.columnCount ? 'grid' + (12 / this.props.columnCount) : 'grid4'
		const calloutGridStyle = this.props.direction && this.props.direction === 'horizontal' ? 'grid6' : 'grid12'
		const calloutImageStyle = this.props.direction && this.props.direction === 'horizontal' ? 'roundImgContainer calloutImage calloutImageHoriz' : 'roundImgContainer calloutImage'
		const calloutTarget = this.props.url && this.props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self'
		return (
			<div className={`${px.callout} column ` + columnGridStyle}>
				<div className={calloutGridStyle}>
					<div className={calloutImageStyle}>
						{ this.props.url
							? <a href={this.props.url} target={calloutTarget} rel="noopener noreferrer"><img src={this.props.img} alt={this.props.title} /></a>
							: <img src={this.props.img} alt={this.props.title} />
						}
					</div>
				</div>
				<div className={calloutGridStyle}>
					{ this.props.url
						? <CalloutHeader url={this.props.url} title={this.props.title} />
						: <CalloutHeader title={this.props.title} />
					}
					<div className={`${px.calloutBody} grid12`}>
						{this.props.content}
						<br/><br/>
						{ this.props.url
							? <div className="centeredbutton"><a href={this.props.url} target={calloutTarget} rel="noopener noreferrer">{this.props.title}</a></div>
							: null
						}
					</div>
				</div>
			</div>
		)
	}
}

/* ========== CALLOUT HEADER ========== */

export class CalloutHeader extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		url: PropTypes.string
	}

	render () {
		const calloutTarget = this.props.url && this.props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self'
		return (
			<div className={`${px.calloutHeader} grid12`}>
				{this.props.url
					? <a href={this.props.url} target={calloutTarget} rel="noopener noreferrer"><h2 className={`${px.calloutTitle}`}>{this.props.title}</h2></a>
					: <h2 className={`${px.calloutTitle}`}>{this.props.title}</h2>
				}
			</div>
		)
	}
}

export class CalloutRoundSm extends Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}

	render () {
		return (
			<div className="grid4fix pad">
				<div className={`${px.roundImgContainer} grid12`}>
					<a href={this.props.url} target="_blank"rel="noopener noreferrer">
						<img src={this.props.img} alt={this.props.title}/>
					</a>
				</div>
				<div className={`${px.calloutHeader} grid12`}>
					<a href={this.props.url} target="_blank" rel="noopener noreferrer">
						<h3 className={`${px.calloutTitle}`}>{this.props.title}</h3>
					</a>
				</div>
			</div>
		)
	}
}

export class CalloutRoundTiny extends Component {
	static defaultProps = {
		gridSize: '2'
	}

	static propTypes = {
		url: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		title: PropTypes.string,
		alt: PropTypes.string.isRequired,
		gridSize: PropTypes.string
	}

	render () {
		return (
			<div className={`${px.roundImgContainer}` + this.props.img ? 'grid' + this.props.gridSize + 'fix' : 'grid' + this.props.gridSize + 'fix noMobile' }>
				<a href={this.props.url} target="_blank" rel="noopener noreferrer">
					<img src={this.props.img} alt={this.props.alt}/></a>
			</div>
		)
	}
}
