import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getXHRData, generateURL } from '../utilities/pixelated.api';
import { mergeDeep } from '../utilities/pixelated.functions';
import './pixelated.carousel.css';

const divSelector = 'div.carouselSliderContainer';
const tx100 = 'translateX(100%)';
const tx0 = 'translateX(0%)';
const txn100 = 'translateX(-100%)';

/* 	
https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na
Not using defaultProps as they are merged shallow, not deep
https://stackoverflow.com/questions/40428847/react-component-defaultprops-objects-are-overridden-not-merged 
*/

/* ========== CAROUSEL ========== */
export function Carousel(props) {
	Carousel.propTypes = {
		flickr: PropTypes.object,
		type: PropTypes.string
	};

	const defaultFlickr = { 
		flickr : {
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
		} 
	};

	const [ flickr, setFlickr ] = useState(mergeDeep(defaultFlickr.flickr, props.flickr));
	const [ images, setImages ] = useState({});
	const [ flickrSize, setFlickrSize ] = useState('');
	const [ type, setType ] = (props.type) ? useState(props.type) : useState('slider') ;

	useEffect(() => {
		setFlickrSize( getFlickrSize(flickr.urlProps.photoSize) );
		const myURL = generateURL(flickr.baseURL, flickr.urlProps);
		const myMethod = 'GET';
		getXHRData(myURL, myMethod, (flickrPhotos) => {
			const myFlickrImages = flickrPhotos.photos.photo;
			// FIX FOR FLICKR API SORT BUG
			myFlickrImages.sort((a, b) => {
				return new Date(b.datetaken) - new Date(a.datetaken);
			}); // b - a for reverse sort
			setImages( myFlickrImages );
		});
	}, []);

	function getFlickrSize (size) {
		switch (size) {
		case 'Square' : return '_s'; // 75
		case 'Large Square' : return '_q'; // 150
		case 'Thumbnail' : return '_t'; // 100
		case 'Small' : return '_m'; // 240
		case 'Small 320' : return '_n'; // 320
		case 'Medium' : return ''; // 500
		case 'Medium 640' : return '_z'; // 640
		case 'Medium 800' : return '_c'; // 800
		case 'Large' : return '_b'; // 1024
		// case "Large2" : return "_h"; // 1600 + secret
		// case "Large3" : return "_k"; // 2048 + secret
		// case "XL3K" : return "_3k"; // 3072 + secret
		// case "XL4K" : return "_4k"; // 4096 + secret
		// case "XLF" : return "_f"; // 4096 + secret - only 2:1 aspect ratio
		// case "XL5K" : return "_5k"; // 5120 + secret
		// case "XL6K" : return "_6k"; // 6144 + secret
		// case "Original" : return "_o"; // secret + EXIF data; not rotated, ? ext
		default : return '';
		}
	}

	let thisState = {
		flickr: flickr,
		images: images,
		flickrSize: flickrSize,
		type: type
	};

	if (type === 'slider') {
		return ( <CarouselSlider flickrData={ thisState } /> );
	} else if (type === 'hero') {
		return ( <CarouselHero flickrData={ thisState } /> );
	} else {
		return null;
	}
}

/* ========== CAROUSEL SLIDER ========== */
export function CarouselSlider(props) {
	CarouselSlider.propTypes = {
		flickrData: PropTypes.object.isRequired
	};

	const debug = false;
	const [ activeIndex, setActiveIndex ] = useState(0);
	const [ direction, setDirection ] = useState('next');
	let drag = {
		draggable: false,
		dragMoving: false,
		eType: null,
		startX: 0, /* start left of object */
		firstX: 0, /* first mouse x */
		previousX: 0, /* prevous mouse x */
		currentX: 0, /* current mouse x */
		directionX: 0,
		momentumX: 0, /* maximum diff of current and previous */
		moveX: 0, /* total mouse x distance */
		newX: 0, /* new left of object */
		minDistance: 50,
		dragStyles: {}
	};

	function previousImage() {
		if (debug) console.log("Going to Previous image : ", activeIndex, " => ", activeIndex - 1);
		if (activeIndex === 0) {
			setActiveIndex(props.flickrData.images.length - 1);
			setDirection( 'prev' );
		} else {
			setActiveIndex(activeIndex - 1);
			setDirection( 'prev' );
		}
	};

	function nextImage() {
		if (debug) console.log("Going to Next image : ", activeIndex, " => ", activeIndex + 1);
		if (activeIndex === props.flickrData.images.length - 1) {
			setActiveIndex(0);
			setDirection( 'next' );
		} else {
			setActiveIndex(activeIndex + 1);
			setDirection( 'next' );
		}
	};

	function animate(elem) {
		requestAnimationFrame(animate);
		elem.style.left = (drag.newX + drag.momentumX) + 'px';
		return true;
	};

	/* 	https://gist.github.com/hartzis/b34a4beeb5ceb4bf1ed8659e477c4191
  		https://www.kirupa.com/html5/drag.htm */

	function dragStart(e) {
		if (debug) { console.log('Drag Start - ' + e.type); }
		// var elem = e.currentTarget ;
		if ((typeof e.target.className === 'string') &&
    	(e.target.className.includes('carouselSliderContainer') ||
    	e.target.className.includes('carouselSliderImage'))) {
			e.preventDefault();
			e.stopPropagation();
			const elem = e.target.closest(divSelector);
			drag.draggable = true;
			drag.eType = e.type;
			drag.firstX = Math.round((drag.eType === 'touchstart') ? e.touches[0].pageX : e.pageX);
			drag.previousX = drag.firstX;
			drag.currentX = drag.firstX;
			drag.startX = elem.offsetLeft;
			/* Add existing drag styles to array - save for later */
			drag.dragStyles.transform = elem.style.transform;
			drag.dragStyles.transition = elem.style.transition;
			if (e.dataTransfer) {
				e.dataTransfer.setData('text/plain', e.currentTarget.id);
				const img = new Image();
				// http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
				img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';
				e.dataTransfer.setDragImage(img, 0, 0);
			}
			// if (debug) { console.log(JSON.stringify(drag)); }
		}
	};

	function draggable(e) {
		drag.dragMoving = true;
		if (drag.draggable) {
			e.preventDefault();
			e.stopPropagation();
			const elem = e.target.closest(divSelector);
			drag.eType = e.type;
			drag.previousX = drag.currentX;
			drag.currentX = Math.round((drag.eType === 'touchmove') ? e.touches[0].pageX : e.pageX);
			/* Set Momentum to max value */
			const _momentumX = Math.round(Math.abs(drag.previousX - drag.currentX));
			drag.momentumX = (_momentumX > drag.momentumX) ? _momentumX : drag.momentumX;
			drag.moveX = Math.round(Math.abs(drag.firstX - drag.currentX));
			/* Right to Left or Left to Right */
			drag.directionX = (drag.firstX > drag.currentX) ? -1 : 1;
			drag.newX = drag.startX + (drag.moveX * drag.directionX);
			// if (debug) { console.log(JSON.stringify(drag)); }
			elem.style.left = drag.newX + 'px';
			/* Remove styles that conflict with dragging */
			elem.style.transition = '';
			elem.style.transform = '';
		}
	};

	function dragEnd(e) {
		if (!drag.dragMoving) {
			const thisImg = props.flickrData.images[activeIndex];
			const thisImgURL = 'https://farm' + thisImg.farm + '.static.flickr.com/' + thisImg.server + '/' + thisImg.id + '_' + thisImg.secret + '_b.jpg';
			// var thisImgURL2 =  "http://flickr.com/photo.gne?id=" + thisImg.id + "_" + thisImg.secret  + ".jpg" ;
			window.open(thisImgURL, '_blank');
		}
		if (drag.draggable) {
			if (debug) { console.log('Drag End - ' + e.type); }
			const elem = e.target.closest(divSelector);

			/* Add styles back */
			for (const property in drag.dragStyles) {
				elem.style[property] = drag.dragStyles[property];
			}

			/* Determine drag distance */
			drag.eType = e.type;
			drag.previousX = drag.currentX;
			drag.currentX = Math.round((drag.eType === 'touchend') ? e.changedTouches[0].pageX : e.pageX);
			drag.moveX = Math.round(Math.abs(drag.firstX - drag.currentX));
			const farEnough = drag.moveX > drag.minDistance;

			/* Add momentum at the end of the slide */
			elem.style.transition = 'all 0.5s ease-out 0.0s'; /* ease-in */
			elem.style.transform = 'translateX(' + ((drag.newX + (drag.momentumX)) * drag.directionX) + ')';

			/* roll in the next / previous image */
			if (farEnough && drag.directionX !== 0) {
				if ( (drag.directionX < 0) ) { 
					if (debug) console.log("Dragged Far Enough - Go Next");
					nextImage(); 
				} else { 
					if (debug) console.log("Dragged Far Enough - Go Previous");
					previousImage(); 
				} ;
			} else {
				if (debug) console.log("Not Dragged Far Enough!");
			}

			// if (debug) { console.log(JSON.stringify(drag)); }

			/* Reset drag variables */
			drag.draggable = false;
			drag.dragMoving = false;
			drag.eType = null;
			drag.startX = 0;
			drag.firstX = 0;
			drag.previousX = 0;
			drag.currentX = null;
			drag.momentumX = 0;
			drag.moveX = 0;
			drag.newX = 0;
			drag.dragStyles = {};

			// e.preventDefault();
		}
	};

	function transitionEnd(e) {
		if (debug) { console.log('Transition End - ' + e.type); }
		const elem = e.target;
		if (elem.matches(divSelector)) {
			elem.style.left = '0px';
		}
	};

	useEffect(() => {
		document.addEventListener('touchstart', dragStart, { passive: false });
		document.addEventListener('touchmove', draggable, { passive: false });
		document.addEventListener('touchend', dragEnd, { passive: true });
		document.addEventListener('mousedown', dragStart, { passive: false });
		document.addEventListener('mousemove', draggable, { passive: false });
		document.addEventListener('mouseup', dragEnd, { passive: true });
		document.addEventListener('transitionend', transitionEnd, { passive: true });
		return () => {
			document.removeEventListener('touchstart', dragStart, { passive: false });
			document.removeEventListener('touchmove', draggable, { passive: false });
			document.removeEventListener('touchend', dragEnd, { passive: true });
			document.removeEventListener('mousedown', dragStart, { passive: false });
			document.removeEventListener('mousemove', draggable, { passive: false });
			document.removeEventListener('mouseup', dragEnd, { passive: true });
			document.removeEventListener('transitionend', transitionEnd, { passive: true });
		};
	  }, [activeIndex]);

	if (props.flickrData.images.length > 0) {
		const myActiveIndex = activeIndex;
		return (
			<div className='section-container'>
				<div className="carouselContainer">
					<CarouselSliderArrow
						direction='left'
						clickFunction={ previousImage }
						glyph='&#9664;' />
					{ props.flickrData.images.map((image, i) => (
						<CarouselSliderImage
							key={image.id}
							direction={direction}
							activeIndex={myActiveIndex} index={i}
							imagesLength={props.flickrData.images.length}
							image={image}
							size={props.flickrData.flickrSize} />
					))}
					<CarouselSliderArrow
						direction='right'
						clickFunction={ nextImage }
						glyph='&#9654;' />
					<CarouselSliderDetails
						index={activeIndex + 1}
						length={props.flickrData.images.length}
						image={props.flickrData.images[myActiveIndex]} />
				</div>
			</div>
		);
	} else {
		return (
			<div className='carousel'></div>
		);
	}
}

/* ========== CAROUSEL SLIDER IMAGE ========== */
export function CarouselSliderImage(props) {
	CarouselSliderImage.propTypes = {
		direction: PropTypes.string.isRequired,
		activeIndex: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		imagesLength: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired,
		size: PropTypes.string.isRequired
	};

	let myImage = React.createRef();

	const myImg = props.image;
	const myZindex = props.imagesLength - props.index;
	const styles = {
		zIndex: myZindex /* ,
		left: '0px' */
	};

	// if (props.direction === 'next') {
	/* Use transition all instead of transform to affect left property */
	styles.transition = 'all 1.0s ease 0.1s'; /* ease-in */
	// } else if (props.direction === 'prev') {
	// styles.transition = 'all 1.0s ease 0.1s'; /* ease-out */
	// }
	if (props.index > props.activeIndex) {
		styles.transform = tx100;
		/* styles.msTransform = tx100;
	styles.WebkitTransform = tx100; */
	} else if (props.index === props.activeIndex) {
		styles.transform = tx0;
		/* styles.msTransform = tx0;
	styles.WebkitTransform = tx0; */
	} else if (props.index < props.activeIndex) {
		styles.transform = txn100;
		/* styles.msTransform = txn100;
	styles.WebkitTransform = txn100; */
	}

	return (
		<div id={'c-' + myImg.id} className="carouselSliderContainer" style={styles} draggable='true'>
			<img className="carouselSliderImage" draggable='false'
				src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server + '/' + myImg.id + '_' + myImg.secret + props.size + '.jpg'}
				id={myImg.id} alt={myImg.title} title={myImg.title} />
		</div>
	);
}

/* ========== CAROUSEL SLIDER DETAILS ========== */
export function CarouselSliderDetails(props) {
	CarouselSliderDetails.propTypes = {
		index: PropTypes.number.isRequired,
		length: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired
	};

	return (
		<div className="carouselSliderDetails textOutlineHalo">
			{props.index} of {props.length} - {props.image.title} <br/>
			by {props.image.ownername} on {props.image.datetaken}
		</div>
	);
}

/* ========== CAROUSEL SLIDER ARROW ========== */
export function CarouselSliderArrow(props) {
	CarouselSliderArrow.propTypes = {
		direction: PropTypes.string.isRequired,
		clickFunction: PropTypes.func.isRequired,
		glyph: PropTypes.string.isRequired
	};

	return (
		<div className={"carouselArrow textOutlineHalo " + props.direction}
			onClick={ props.clickFunction }>
			{ props.glyph }
		</div>
	);
}

/* ========== CAROUSEL HERO ========== */
export function CarouselHero(props) {
	CarouselHero.propTypes = {
		flickrData: PropTypes.object.isRequired
	};

	let debug = false;
	const [flickrData, setFlickrData] = useState({});
	const [flickrImages, setFlickrImages] = useState({});
	const [activeIndex, setActiveIndex] = useState(0);
	const [direction, setDirection] = useState('up');
	const timeout = 5000;

	const nextImage = () => {
		if(debug) { console.log('nextImage - ' + activeIndex); }
		if (activeIndex === flickrImages.length - 1) {
			setActiveIndex(0);
		} else {
			setActiveIndex(activeIndex + 1);
		}
		if (direction === 'up' ) { setDirection('down'); } ;
	};

	useEffect(() => {
		if(debug) { console.log('Loading Hero Carousel...'); }
		if (props.flickrData) { setFlickrData(props.flickrData); } ;
		if (props.flickrData.images) { setFlickrImages(props.flickrData.images); } ;
		if (timeout > 0) {
			setTimeout(
				function () { nextImage(); }
					.bind(this),
				timeout
			);
		}
	}, [props, activeIndex]);

	return (
		<Fragment >
			{ flickrImages.length > 0 && flickrImages.map((image, i) => (
				<CarouselHeroImage
					key={image.id}
					direction={direction}
					activeIndex={activeIndex}
					index={i}
					imagesLength={flickrImages.length}
					image={image}
					size={flickrData.flickrSize} />
			))}
			{(flickrImages && flickrImages.length > 0) ? 
				<CarouselHeroDetails
					index={activeIndex + 1}
					length={flickrImages.length}
					image={flickrImages[activeIndex]} />
				: null} 
		</Fragment>
	);
}

/* ========== CAROUSEL HERO IMAGE ========== */
export function CarouselHeroImage(props) {
	CarouselHeroImage.propTypes = {
		direction: PropTypes.string.isRequired,
		activeIndex: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		imagesLength: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired,
		size: PropTypes.string.isRequired
	};

	const myImg = props.image;
	const myZindex = props.imagesLength - props.index;
	const styles = {
		zIndex: myZindex
	};		
	let classes = "carouselHeroImage";
	if (props.index > props.activeIndex) {
		classes += " carouselHeroHidden";
	} else if (props.index === props.activeIndex - 1) {
		classes += " carouselHeroHide";
	} else if (props.index === props.activeIndex) {
		classes += " carouselHeroVisible";
	} else if (props.index < props.activeIndex) {
		classes += " carouselHeroHidden";
	}

	return (
		<img className={classes}
			style={styles}
			src={'https://farm' + myImg.farm + '.static.flickr.com/' + myImg.server + '/' + myImg.id + '_' + myImg.secret + props.size + '.jpg'}
			alt={myImg.title}
			title={myImg.title} />
	);
}

/* ========== CAROUSEL HERO DETAILS ========== */
export function CarouselHeroDetails(props) {
	CarouselHeroDetails.propTypes = {
		index: PropTypes.number.isRequired,
		length: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired
	};

	return (
		<div className='section-container'>
			<div className="carouselHeroDetails textOutlineHalo">
				<div className="carouselHeroDetailsLeft">
					<div>{props.index} of {props.length}</div>
					<div>{props.image.title}</div>
				</div>
				<div className="carouselHeroDetailsRight">
					<div>by {props.image.ownername}</div>
					<div>{props.image.datetaken}</div>
				</div>
			</div>
		</div>
	);
}
