import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getXHRData, generateURL } from './pixelated.api.js';
import { mergeDeep } from './pixelated.functions.js';
import '../css/pixelated.carousel.css';

const divSelector = 'div.carousel-slider-container';
const tx100 = 'translateX(100%)';
const tx0 = 'translateX(0%)';
const txn100 = 'translateX(-100%)';

/* https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

/* ========== CAROUSEL ========== */
export default class Carousel extends Component {
	static defaultProps = {
		size: '' /* Medium */
	}

	static propTypes = {
		qsParams: PropTypes.object,
		type: PropTypes.string
	}

	constructor (props) {
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
					photoSize: 'Medium',
					nojsoncallback: 'true' /*,
					startPos: 0 */
				}
			},
			images: [],
			size: '',
			type: 'slider'
		};
		if (this.props.qsParams && this.props.qsParams.tag) {
			this.state.flickr.urlProps.tags = this.props.qsParams.tag;
		}
		if (this.props.type) {
			this.state.type = this.props.type;
		}
		if (this.state.flickr.urlProps.photoSize) {
			this.state.size = this.flickrSize(this.state.flickr.urlProps.photoSize);
		}
	}

	componentDidMount () {
		var myURL = generateURL(this.state.flickr.baseURL, this.state.flickr.urlProps);
		getXHRData(generateURL(myURL, this.state.flickr.urlProps), (flickrData) => {
			var myFlickrData = flickrData.photos.photo;
			this.setState({ images: myFlickrData });
		});
	}

	flickrSize (size) {
		switch (size) {
		case 'Square' : return '_s';
		case 'Large Square' : return '_q';
		case 'Thumbnail' : return '_t';
		case 'Small' : return '_m';
		case 'Small 320' : return '_n';
		case 'Medium' : return '';
		case 'Medium 640' : return '_z';
		case 'Medium 800' : return '_c';
		case 'Large' : return '_b';
		case 'Original' : return '_o';
		default : return '';
		}
	}

	render () {
		if (this.state.type === 'slider') {
			return (
				<CarouselSlider props={ this.state } />
			);
		} else if (this.state.type === 'hero') {
			return (
				<CarouselHero props={ this.state } />
			);
		} else {
			return null;
		}
	}
}

/* ========== CAROUSEL SLIDER ========== */
export class CarouselSlider extends Component {
	static propTypes = {
		props: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props);
		this.state = {
			activeIndex: 0,
			direction: 'next'
		};
		this.drag = {
			debug: false,
			minDistance: 50,
			dragging: false,
			dragStyles: {},
			dragX: null,
			startX: null
		};
	}

	previousImage = () => {
		if (this.state.activeIndex === 0) {
			this.setState({ activeIndex: this.props.props.images.length - 1, direction: 'prev' });
		} else {
			this.setState({ activeIndex: this.state.activeIndex - 1, direction: 'prev' });
		}
	}

	nextImage = () => {
		if (this.state.activeIndex === this.props.props.images.length - 1) {
			this.setState({ activeIndex: 0, direction: 'next' });
		} else {
			this.setState({ activeIndex: this.state.activeIndex + 1, direction: 'next' });
		}
	}

	/* https://gist.github.com/hartzis/b34a4beeb5ceb4bf1ed8659e477c4191
	https://www.kirupa.com/html5/drag.htm */

	dragStart = (e) => {
		if (this.drag.debug) { console.log('Drag Start - ' + e.type); }
		// var elem = e.currentTarget ;
		if (e.target.className.includes('carousel-slider-container') ||
			e.target.className.includes('carousel-slider-image')) {
			e.preventDefault();
			e.stopPropagation();
			var elem = e.target.closest(divSelector);
			var rect = elem.getBoundingClientRect();
			var myX = Math.round((e.type === 'touchstart') ? e.touches[0].pageX : e.pageX);
			this.drag.dragging = true;
			this.drag.dragX = myX;
			this.drag.startX = rect.lef;
			/* Add existing drag styles to array - save for later */
			this.drag.dragStyles.transform = elem.style.transform;
			this.drag.dragStyles.msTransform = elem.style.msTransform;
			this.drag.dragStyles.WebkitTransform = elem.style.WebkitTransform;
			this.drag.dragStyles.transition = elem.style.transition;
			/* if(e.dataTransfer){
				e.dataTransfer.setData('text/plain', e.currentTarget.id);
				var img = new Image();
				// http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
				img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';
				e.dataTransfer.setDragImage(img, 0, 0);
			} */
		}
	}

	dragging = (e) => {
		if (this.drag.dragging) {
			e.preventDefault();
			e.stopPropagation();
			var elem = e.target.closest(divSelector);
			var myX = Math.round((e.type === 'touchmove') ? e.touches[0].pageX : e.pageX);
			var deltaX = Math.round(Math.abs(myX - this.drag.dragX));
			var newLeft;
			if (this.drag.dragX > myX) {
				/* Right to Left */
				newLeft = this.drag.startX - deltaX;
			} else {
				/* Left to Right */
				newLeft = this.drag.startX + deltaX;
			}
			if (this.drag.debug) { console.log('type=' + e.type + ' myX=' + myX + ' dragX=' + this.drag.dragX + ' deltaX=' + deltaX + ' newLeft=' + newLeft); }
			elem.style.left = newLeft + 'px';
			/* Remove styles that conflict with dragging */
			elem.style.transition = '';
			elem.style.transform = '';
			elem.style.msTransform = '';
			elem.style.WebkitTransform = '';
		}
	}

	dragEnd = (e) => {
		if (this.drag.dragging) {
			if (this.drag.debug) { console.log('Drag End - ' + e.type); }
			var elem = e.target.closest(divSelector);
			/* Add styles back */
			for (var property in this.drag.dragStyles) {
				elem.style[property] = this.drag.dragStyles[property];
			}
			/* Determine drag distance */
			var myX = (e.type === 'touchend') ? e.changedTouches[0].pageX : e.pageX;
			var distance = Math.abs(myX - this.drag.dragX);
			var farEnough = distance > this.drag.minDistance;
			if (farEnough) {
				if (this.drag.dragX > myX) {
					/* Right to Left is Next */
					this.nextImage();
				} else {
					/* Left to Right is Previous */
					this.previousImage();
				}
			}
			this.drag.dragging = false;
			this.drag.dragX = null;
			this.drag.startX = null;
			// e.preventDefault();
		}
	}

	transitionEnd = (e) => {
		if (this.drag.debug) { console.log('Transition End - ' + e.type); }
		var elem = e.target;
		if (elem.matches(divSelector)) {
			elem.style.left = '0px';
		}
	}

	componentDidMount () {
		document.addEventListener('touchstart', this.dragStart, { passive: false });
		document.addEventListener('touchmove', this.dragging, { passive: false });
		document.addEventListener('touchend', this.dragEnd, { passive: true });
		document.addEventListener('mousedown', this.dragStart, { passive: false });
		document.addEventListener('mousemove', this.dragging, { passive: false });
		document.addEventListener('mouseup', this.dragEnd, { passive: true });
		document.addEventListener('transitionend', this.transitionEnd, { passive: true });
	}

	componentWillUnmount () {
		document.removeEventListener('touchstart', this.dragStart, { passive: false });
		document.removeEventListener('touchmove', this.dragging, { passive: false });
		document.removeEventListener('touchend', this.dragEnd, { passive: true });
		document.removeEventListener('mousedown', this.dragStart, { passive: false });
		document.removeEventListener('mousemove', this.dragging, { passive: false });
		document.removeEventListener('mouseup', this.dragEnd, { passive: true });
		document.removeEventListener('transitionend', this.transitionEnd, { passive: true });
	}

	render () {
		if (this.props.props.images.length > 0) {
			var myActiveIndex = this.state.activeIndex;
			return (
				<div className='section-container'>
					<div className='carousel-container'>
						<CarouselSliderArrow direction='left' clickFunction={ this.previousImage } glyph='&#9664;' />
						{ this.props.props.images.map((image, i) => (
							<CarouselSliderImage
								key={image.id} direction={this.state.direction} activeIndex={myActiveIndex} index={i}
								imagesLength={this.props.props.images.length} image={image} size={this.props.props.size}
								/* onTouchStart={this.dragStart} onTouchMove={this.dragging} onTouchEnd={this.dragEnd} */
								/* onDragStart={this.dragStart} onDrag={this.dragging} onDragEnd={this.dragEnd} */ />
						))}
						<CarouselSliderArrow direction='right' clickFunction={ this.nextImage } glyph='&#9654;' />
						<CarouselSliderDetails index={this.state.activeIndex + 1} length={this.props.props.images.length} image={this.props.props.images[myActiveIndex]} />
					</div>
				</div>
			);
		} else {
			return (
				<div className='carousel'></div>
			);
		}
	}
}

/* ========== CAROUSEL SLIDER IMAGE ========== */
export class CarouselSliderImage extends Component {
	static propTypes = {
		direction: PropTypes.string.isRequired,
		activeIndex: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		imagesLength: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired,
		size: PropTypes.string.isRequired
	}

	constructor (props) {
		super(props);
		this.myImage = React.createRef();
		this.state = {
		};
	}

	render () {
		var myImg = this.props.image;
		var myZindex = this.props.imagesLength - this.props.index;
		var styles = {
			zIndex: myZindex /* ,
			left: '0px' */
		};

		if (this.props.direction === 'next') {
			/* Use transition all instead of transform to affect left property */
			styles.transition = 'all 1.0s ease-in 0.1s';
		} else if (this.props.direction === 'prev') {
			styles.transition = 'all 1.0s ease-out 0.1s';
		}
		if (this.props.index > this.props.activeIndex) {
			styles.transform = tx100;
			styles.msTransform = tx100;
			styles.WebkitTransform = tx100;
		} else if (this.props.index === this.props.activeIndex) {
			styles.transform = tx0;
			styles.msTransform = tx0;
			styles.WebkitTransform = tx0;
		} else if (this.props.index < this.props.activeIndex) {
			styles.transform = txn100;
			styles.msTransform = txn100;
			styles.WebkitTransform = txn100;
		}

		return (
			<div id={'c-' + myImg.id} className='carousel-slider-container' style={styles} draggable='true'>
				<img className='carousel-slider-image' draggable='false'
					src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server + '/' + myImg.id + '_' + myImg.secret + this.props.size + '.jpg'}
					id={myImg.id} alt={myImg.title} title={myImg.title} />
			</div>
		);
	}
}

/* ========== CAROUSEL SLIDER DETAILS ========== */
export class CarouselSliderDetails extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		length: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired
	}

	render () {
		return (
			<div className='carousel-slider-details text-outline-halo'>
				{this.props.index} of {this.props.length} - {this.props.image.title} <br/>
				by {this.props.image.ownername} on {this.props.image.datetaken}
			</div>
		);
	}
}

/* ========== CAROUSEL SLIDER ARROW ========== */
export class CarouselSliderArrow extends Component {
	static propTypes = {
		direction: PropTypes.string.isRequired,
		clickFunction: PropTypes.func.isRequired,
		glyph: PropTypes.string.isRequired
	}

	render () {
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
		props: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props);
		this.debug = false;
		this.state = {
			activeIndex: 0,
			direction: 'up',
			timeout: 5000
		};
		if (this.props.props) {
			this.state = mergeDeep(this.state, props.props);
		}
	}

	nextImage = () => {
		if (this.state.activeIndex === this.props.props.images.length - 1) {
			this.setState({ activeIndex: 0, direction: (this.state.direction === 'up' ? 'down' : 'up') });
		} else {
			this.setState({ activeIndex: this.state.activeIndex + 1, direction: (this.state.direction === 'up' ? 'down' : 'up') });
		}
	}

	render () {
		if (this.props.props.images.length > 0) {
			if (this.state.timeout > 0) {
				setTimeout(function () {
					this.nextImage();
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
				<div className='carousel'></div>
			);
		}
	}
}

/* ========== CAROUSEL HERO IMAGE ========== */
export class CarouselHeroImage extends Component {
	static propTypes = {
		direction: PropTypes.string.isRequired,
		activeIndex: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		imagesLength: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired,
		size: PropTypes.string.isRequired
	}

	render () {
		var myImg = this.props.image;
		var myZindex = this.props.imagesLength - this.props.index;
		var styles = {
			zIndex: myZindex
		};
		var classes = 'carousel-hero-image';

		if (this.props.index > this.props.activeIndex) {
			classes += ' carousel-hero-hidden';
		} else if (this.props.index === this.props.activeIndex - 1) {
			classes += ' carousel-hero-hide';
		} else if (this.props.index === this.props.activeIndex) {
			classes += ' carousel-hero-visible';
		} else if (this.props.index < this.props.activeIndex) {
			classes += ' carousel-hero-hidden';
		}

		return (
			<img className={classes} style={styles} src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server + '/' + myImg.id + '_' + myImg.secret + this.props.size + '.jpg'} alt={myImg.title} title={myImg.title} />
		);
	}
}

/* ========== CAROUSEL HERO DETAILS ========== */
export class CarouselHeroDetails extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		length: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired
	}

	render () {
		return (
			<div className='section-container'>
				<div className='carousel-hero-details text-outline-halo'>
					<div className='carousel-hero-details-left'>
						<div>{this.props.index} of {this.props.length}</div>
						<div>{this.props.image.title}</div>
					</div>
					<div className='carousel-hero-details-right'>
						<div>by {this.props.image.ownername}</div>
						<div>{this.props.image.datetaken}</div>
					</div>
				</div>
			</div>
		);
	}
}
