import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/pixelated.carousel.css';

/* https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

class CarouselImage extends Component{
	static propTypes = {
        direction: PropTypes.string.isRequired ,
        activeIndex: PropTypes.number.isRequired ,
        index: PropTypes.number.isRequired ,
        imagesLength: PropTypes.number.isRequired ,
        image: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		var myImg = this.props.image ;
		var myZindex = this.props.imagesLength - this.props.index ;
		var styles = {
			zIndex: myZindex
		}

		if (this.props.direction === "next"){
			if(this.props.index > this.props.activeIndex){
				styles.transition = "transform 1.0s ease-in 0.1s";
				styles.transform = "translateX(100%)";
			} else if(this.props.index === this.props.activeIndex)  {
				styles.transition = "transform 1.0s ease-in 0.1s";
				styles.transform = "translateX(0%)";
			} else if(this.props.index < this.props.activeIndex) {
				styles.transition = "transform 1.0s ease-in 0.1s";
				styles.transform = "translateX(-100%)";
			}
		} else if (this.props.direction === "prev"){
			if(this.props.index > this.props.activeIndex){
				styles.transition = "transform 1.0s ease-out 0.1s";
				styles.transform = "translateX(100%)";
			} else if(this.props.index === this.props.activeIndex){
				styles.transition = "transform 1.0s ease-out 0.1s";
				styles.transform = "translateX(0%)";
			} else if(this.props.index < this.props.activeIndex){
				styles.transition = "transform 1.0s ease-out 0.1s";
				styles.transform = "translateX(-100%)";
			}
		}

		return (
			<div className="carousel-image-container" id={myImg.id} style={styles}>
			<img className="carousel-image" src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server+ '/' + myImg.id + '_' + myImg.secret + '.jpg'} alt={myImg.title} title={myImg.title} />
			</div>
		);
	}
}

class CarouselArrow extends Component{
	static propTypes = {
        direction: PropTypes.string.isRequired,
        clickFunction: PropTypes.func.isRequired,
        glyph: PropTypes.string.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<div
				className={'carousel-arrow ' + this.props.direction}
				onClick={ this.props.clickFunction }>
				{ this.props.glyph }
			</div>
		);
	}
}

class CarouselDetails extends Component{
	static propTypes = {
        index: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired,
        image: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
		<div className="carousel-details">
			{this.props.index} of {this.props.length} - {this.props.image.title} <br/>
			by {this.props.image.ownername} on {this.props.image.datetaken}
		</div>
		);
	}
}

class Carousel extends Component {

	static propTypes = {
        qsParams: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			flickr: {
				/* baseURL: 'https://api.flickr.com/services/rest/?jsoncallback=?', */
				baseURL: 'https://api.flickr.com/services/rest/?',
				method: 'flickr.photos.search',
				apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
				userId: '15473210@N04',
				tags: 'pixelatedviewsgallery',
				extras: 'date_taken,description,owner_name',
				sort: 'date-taken-desc',
				perPage: 500,
				format: 'json' /*,
				photoSize: "",
				startPos: 0 */
			},
			images: [],
			activeIndex: 0,
			direction: 'next'
		};
		if(this.props.qsParams){
			if(this.props.qsParams.tag){
				this.state.flickr.tags = this.props.qsParams.tag;
			}
		}
		this.previousImage = this.previousImage.bind(this);
		this.nextImage = this.nextImage.bind(this);
	}

	previousImage() {
		if(this.state.activeIndex === 0){
			this.setState({ activeIndex: this.state.images.length - 1, direction: 'prev' });
		} else {
			this.setState({ activeIndex: this.state.activeIndex - 1, direction: 'prev' });
		}
	}

	nextImage() {
		if(this.state.activeIndex === this.state.images.length - 1){
			this.setState({ activeIndex: 0, direction: 'next' });
		} else {
			this.setState({ activeIndex: this.state.activeIndex + 1, direction: 'next' });
			/* this.setState(prevState => ({
				activeIndex: this.state.activeIndex + 1
			  })); */
		}
	}

	imageWidth = () => {
		return document.querySelector('.carousel-image').clientWidth
	}

	componentDidMount() {
		var apiURL = this.state.flickr.baseURL +
			'method=' + this.state.flickr.method +
			'&api_key=' + this.state.flickr.apiKey +
			'&user_id=' + this.state.flickr.userId +
			'&tags=' + this.state.flickr.tags +
			'&extras=' + this.state.flickr.extras +
			'&sort=' + this.state.flickr.sort +
			'&per_page=' + this.state.flickr.perPage +
			'&format=' + this.state.flickr.format ;

		var script = document.createElement('script');
		script.innerHTML = 'window.jsonFlickrApi = function(response){window.flickrData = response;}' ;
		document.querySelector('head').appendChild(script);

		var script2 = document.createElement('script');
		script2.src = apiURL;
		document.querySelector('head').appendChild(script2);

		var getFlickrData = () => {
			if (window.flickrData) {
				this.setState({ images: window.flickrData.photos.photo });
			} else {
				setTimeout(getFlickrData, 1000);
			}
		};
		getFlickrData();
	}

	render() {
		if (this.state.images.length > 0){
			var myActiveIndex = this.state.activeIndex;
			return (
				<div className="content-container">
					<div className="carousel-container">
						<CarouselArrow direction='left' clickFunction={ this.previousImage } glyph='&#9664;' />
							{ this.state.images.map((image, i) => (
								<CarouselImage key={image.id} direction={this.state.direction} activeIndex={myActiveIndex} index={i} imagesLength={this.state.images.length} image={image} />
							))}
						<CarouselArrow direction='right' clickFunction={ this.nextImage } glyph='&#9654;' />
						<CarouselDetails index={this.state.activeIndex + 1} length={this.state.images.length} image={this.state.images[myActiveIndex]} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="carousel"></div>
			);
		}
	}
}

export default Carousel;
