import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        return (

            <div className="content-container" dangerouslySetInnerHTML={{__html: '<gcse:search></gcse:search>'}}>
            </div>

        );
    }
}
