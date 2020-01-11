import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getXHRData, generateURL } from './pixelated.api.js';
import { mergeDeep } from "./pixelated.functions.js"
import '../css/pixelated.carousel.css';

/* https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

/* ========== CAROUSEL ========== */
export default class Carousel extends Component {

	static propTypes = {
        qsParams: PropTypes.object,
        type: PropTypes.string
	}

	constructor(props) {
		super(props);
		this.state = {
			flickr: {
				baseURL: 'https://api.flickr.com/services/rest/?',
				urlProps: {
					method: 'flickr.photos.search',
					api_key: '882cab5548d53c9e6b5fb24d59cc321d',
					user_id: '15473210@N04',
					tags: 'pixelatedviewsgallery',
					extras: 'date_taken,description,owner_name',
					sort: 'date-taken-desc',
					per_page: 500,
					format: 'json',
					photoSize: 'Large',
					nojsoncallback: 'true' /*,
					startPos: 0 */
				}
			},
			images: [],
			size: '',
			type: "slider"
		};
		if(this.props.qsParams){
			if(this.props.qsParams.tag){
				this.state.flickr.urlProps.tags = this.props.qsParams.tag;
			}
		}
		if(this.props.type){
			this.state.type = this.props.type ;
		}
		if(this.state.flickr.urlProps.photoSize){
			this.state.size = this.flickrSize(this.state.flickr.urlProps.photoSize) ;
		} else {
			this.state.size = this.flickrSize("Medium") ;
		}
	}

	componentDidMount() {
		var myURL = generateURL(this.state.flickr.baseURL, this.state.flickr.urlProps);
		getXHRData(generateURL(myURL, this.state.flickr.urlProps), (flickrData) => {
			var myFlickrData = flickrData.photos.photo ;
			this.setState({ images: myFlickrData });
		})
	}

	flickrSize(size){
		switch (size) {
			case "Square" : return "_s";
			case "Large Square" : return "_q";
			case "Thumbnail" : return "_t";
			case "Small" : return "_m";
			case "Small 320" : return "_n";
			case "Medium" : return "";
			case "Medium 640" : return "_z";
			case "Medium 800" : return "_c";
			case "Large" : return "_b";
			case "Original" : return "_o";
			default : return "";
		}
	}

	render() {
		if (this.state.type === "slider"){
			return (
				<CarouselSlider props={ this.state } />
			);
		} else if (this.state.type === "hero"){
			return (
				<CarouselHero props={ this.state } />
			);
		} else {
			return null ;
		}
	}
}

/* ========== CAROUSEL SLIDER ========== */
export class CarouselSlider extends Component {

	static propTypes = {
        props: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			direction: 'next'
		};
		this.previousImage = this.previousImage.bind(this);
		this.nextImage = this.nextImage.bind(this);
	}

	previousImage() {
		if(this.state.activeIndex === 0){
			this.setState({ activeIndex: this.props.props.images.length - 1, direction: 'prev' });
		} else {
			this.setState({ activeIndex: this.state.activeIndex - 1, direction: 'prev' });
		}
	}

	nextImage() {
		if(this.state.activeIndex === this.props.props.images.length - 1){
			this.setState({ activeIndex: 0, direction: 'next' });
		} else {
			this.setState({ activeIndex: this.state.activeIndex + 1, direction: 'next' });
			/* this.setState(prevState => ({
				activeIndex: this.state.activeIndex + 1
			  })); */
		}
	}

	render() {
		if (this.props.props.images.length > 0){
			var myActiveIndex = this.state.activeIndex;
			return (
				<div className="section-container">
					<div className="carousel-container">
						<CarouselSliderArrow direction='left' clickFunction={ this.previousImage } glyph='&#9664;' />
							{ this.props.props.images.map((image, i) => (
								<CarouselSliderImage key={image.id} direction={this.state.direction} activeIndex={myActiveIndex} index={i} imagesLength={this.props.props.images.length} image={image} size={this.props.props.size} />
							))}
						<CarouselSliderArrow direction='right' clickFunction={ this.nextImage } glyph='&#9654;' />
						<CarouselSliderDetails index={this.state.activeIndex + 1} length={this.props.props.images.length} image={this.props.props.images[myActiveIndex]} />
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

/* ========== CAROUSEL SLIDER IMAGE ========== */
export class CarouselSliderImage extends Component{
	static propTypes = {
        direction: PropTypes.string.isRequired ,
        activeIndex: PropTypes.number.isRequired ,
        index: PropTypes.number.isRequired ,
        imagesLength: PropTypes.number.isRequired ,
        image: PropTypes.object.isRequired ,
        size: PropTypes.string.isRequired
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
			<div className="carousel-slider-container" id={myImg.id} style={styles}>
			<img className="carousel-slider-image" src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server+ '/' + myImg.id + '_' + myImg.secret + this.props.size + '.jpg'} alt={myImg.title} title={myImg.title} />
			</div>
		);
	}
}

/* ========== CAROUSEL SLIDER DETAILS ========== */
export class CarouselSliderDetails extends Component{
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
		<div className="carousel-slider-details text-outline-halo">
			{this.props.index} of {this.props.length} - {this.props.image.title} <br/>
			by {this.props.image.ownername} on {this.props.image.datetaken}
		</div>
		);
	}
}

/* ========== CAROUSEL SLIDER ARROW ========== */
export class CarouselSliderArrow extends Component{
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
			<div className={'carousel-arrow text-outline-halo ' + this.props.direction}
				onClick={ this.props.clickFunction }>
				{ this.props.glyph }
			</div>
		);
	}
}

/* ========== CAROUSEL HERO ========== */
export class CarouselHero extends Component {

	static propTypes = {
        props: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			direction: 'up',
			timeout: 5000
		};

		this.nextImage = this.nextImage.bind(this);

		if(this.props.props){
			this.state = mergeDeep(this.state, props.props);
		}
	}

	nextImage = function() {
		if(this.state.activeIndex === this.props.props.images.length - 1){
			this.setState({ activeIndex: 0, direction: ( this.state.direction === 'up' ? 'down' : 'up' ) });
		} else {
			this.setState({ activeIndex: this.state.activeIndex + 1, direction: ( this.state.direction === 'up' ? 'down' : 'up' ) });
		}
	}

	render() {
		if (this.props.props.images.length > 0){

			if (this.state.timeout > 0 ) {
				setTimeout ( function() {
					this.nextImage() ;
				}
				.bind(this),
				this.state.timeout);
			}

			return (
				<Fragment >
					{ this.props.props.images.map((image, i) => (
						<CarouselHeroImage key={image.id} direction={this.state.direction} activeIndex={this.state.activeIndex} index={i} imagesLength={this.props.props.images.length} image={image} size={this.props.props.size} />
					))}
					<CarouselHeroDetails index={this.state.activeIndex + 1} length={this.props.props.images.length} image={this.props.props.images[this.state.activeIndex]} />
				</Fragment>
			);

		} else {
			return (
				<div className="carousel"></div>
			);
		}

	}
}

/* ========== CAROUSEL HERO IMAGE ========== */
export class CarouselHeroImage extends Component{
	static propTypes = {
        direction: PropTypes.string.isRequired ,
        activeIndex: PropTypes.number.isRequired ,
        index: PropTypes.number.isRequired ,
        imagesLength: PropTypes.number.isRequired ,
        image: PropTypes.object.isRequired ,
        size: PropTypes.string.isRequired
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
		var classes = "carousel-hero-image" ;

		if(this.props.index > this.props.activeIndex){
			classes += ' carousel-hero-hidden' ;
		} else if(this.props.index === this.props.activeIndex - 1){
			classes += ' carousel-hero-hide' ;
		}else if(this.props.index === this.props.activeIndex){
			classes += ' carousel-hero-visible' ;
		} else if(this.props.index < this.props.activeIndex){
			classes += ' carousel-hero-hidden' ;
		}


		return (
			<img className={classes} style={styles} src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server+ '/' + myImg.id + '_' + myImg.secret + this.props.size + '.jpg'} alt={myImg.title} title={myImg.title} />
		);
	}
}

/* ========== CAROUSEL HERO DETAILS ========== */
export class CarouselHeroDetails extends Component{
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
		<div className="carousel-hero-details text-outline-halo">
			<div className="carousel-hero-details-left">
				<div>{this.props.index} of {this.props.length}</div>
				<div>{this.props.image.title}</div>
			</div>
			<div className="carousel-hero-details-right">
				<div>by {this.props.image.ownername}</div>
				<div>{this.props.image.datetaken}</div>
			</div>
		</div>
		);
	}
}
