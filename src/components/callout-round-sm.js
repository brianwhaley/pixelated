import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalloutRoundSm extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
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

export default CalloutRoundSm;
