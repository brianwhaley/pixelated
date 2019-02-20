import React, { Component } from 'react';

class CalloutHeader extends Component {
    render() {
        return (
            
            <div class="row">	
                <div class="column grid12">
                    <div class="callout-header">
                        <h2 class="callout-title">{this.props.title}</h2>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default CalloutHeader;
