import React, { Component } from 'react';

class carousel extends Component {
    render() {
        return (
            <div className={ this.props.img ? 'grid2fix social-image' : 'grid2fix' }>
                <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                <img src={this.props.img} alt={this.props.title}/></a>
            </div>
        );
    }
}

export default carousel;