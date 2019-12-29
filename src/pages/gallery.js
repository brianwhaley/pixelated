import React, { Component } from 'react';
import Carousel from '../components/carousel';
import queryString from 'query-string';

export default class Gallery extends Component {
    render() {
		let myParams = queryString.parse(this.props.location.search);
        return (
			<Carousel qsParams={myParams}></Carousel>
        );
    }
}
