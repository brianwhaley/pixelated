import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalloutRoundTiny extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
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

export default CalloutRoundTiny;
