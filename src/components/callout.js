import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Callout extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
		};
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

export class CalloutHeader extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    }
	constructor(props) {
		super(props);
		this.state = {
		};
	}
    render() {
        return (

            <div className="row">
                <div className="column grid12">
                    <div className="callout-header">
                        <h2 className="callout-title">{this.props.title}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export class CalloutHorizontal extends Component {
    static propTypes = {
		props: PropTypes.object
	}
	render() {
        return (
            <div></div>
        );
	}
}

export class CalloutRoundSm extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }
	constructor(props) {
		super(props);
		this.state = {
		};
	}
    render() {
        return (
            <div className="grid4fix pad">
                <div className="grid12 round-img-container">
                    <a href={this.props.url} target="_blank"rel="noopener noreferrer">
                    <img src={this.props.img} alt={this.props.title}/>
                    </a>
                </div>
                <div className="grid12 callout-header">
                    <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="callout-title">{this.props.title}</h3>
                    </a>
                </div>
            </div>
        );
    }
}

export class CalloutRoundTiny extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }
	constructor(props) {
		super(props);
		this.state = {
		};
	}
    render() {
        return (
            <div className={ this.props.img ? 'grid2fix social-image' : 'grid2fix' }>
                <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                <img src={this.props.img} alt={this.props.title}/></a>
            </div>
        );
    }
}

export default Callout;
