import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Callout extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }

    render() {
        return (
			<div className="column callout grid4">
				<div className="grid12">
					<div className="callout-image">
						<a href={this.props.url} target="_blank" rel="noopener noreferrer">
						<img src={this.props.img} alt={this.props.title} /></a>
					</div>
				</div>
				<div className="callout-header grid12">
					<h2 className="callout-title">
					<a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.title}</a></h2>
				</div>
				<div className="callout-body grid12">
					{this.props.content}
					<br/><br/>
					<div className="centeredbutton"><a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.title}</a></div>
				</div>
			</div>
        );
    }
}

export default Callout;
