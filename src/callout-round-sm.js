import React, { Component } from 'react';

class CalloutRoundSm extends Component {
    render() {
        return (
            
            <div class="grid4fix pad">
                <div class="grid12 round-img-container">
                    <a href={this.props.url} target="_blank">
                    <img src={this.props.img}/>
                    </a>
                </div>
                <div class="grid12 callout-header">
                    <a href={this.props.url} target="_blank">
                    <h3 class="callout-title">{this.props.title}</h3>
                    </a>
                </div>
            </div>
            
        );
    }
}

export default CalloutRoundSm;
