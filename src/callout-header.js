import React, { Component } from 'react';

class CalloutHeader extends Component {
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

export default CalloutHeader;
