import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../components/pixelated.carousel.js';
import queryString from 'query-string';

export default class Gallery extends Component {
	static propTypes = {
        location: PropTypes.object
	}
    render() {
		let myParams = queryString.parse(this.props.location.search);
        return (
			<Carousel qsParams={myParams} type="slider"></Carousel>
        );
    }
}
