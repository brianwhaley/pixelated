import React, { Component } from 'react';

class CalloutRoundSm extends Component {
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
