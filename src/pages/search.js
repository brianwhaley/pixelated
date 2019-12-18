import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (

            <div className="content-container" dangerouslySetInnerHTML={{__html: '<gcse:search></gcse:search>'}}>
            </div>	

        );
    }
}

export default Search;
