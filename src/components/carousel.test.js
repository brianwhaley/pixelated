
import React from 'react';
import renderer from 'react-test-renderer';
import Carousel, { CarouselImage, CarouselArrow, CarouselDetails /* , getFlickrData */ } from './carousel';

const image = {
	id: "42079144500" ,
	owner: "15473210@N04" ,
	secret: "c28146304a" ,
	server: "852" ,
	farm: 1 ,
	title: "Sunflower Picking at Alstede Farm 2018-07-30" ,
	ispublic: 1 ,
	isfriend: 0 ,
	isfamily: 0 ,
	description: "Sunflower Picking at Alstede Farm 2018-07-30 via 5…ift.tt/2MoNJlH" ,
	datetaken: "2018-07-30 15:21:06" ,
	datetakengranularity: "0" ,
	datetakenunknown: "0" ,
	ownername: "brianwhaley"
};

describe('Carousel', () => {

	test('Carousel snapshot renders', () => {
		const cCarousel = renderer.create(<Carousel />);
		let tree = cCarousel.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CarouselImage snapshot renders', () => {
        const direction = 'next' ;
        const activeIndex = 0 ;
        const index = 1 ;
        const imagesLength = 135 ;
		const cCarouselImage = renderer.create(<CarouselImage direction={direction} activeIndex={activeIndex} index={index} imagesLength={imagesLength} image={image}/>);
		let tree = cCarouselImage.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CarouselArrow Next snapshot renders', () => {
        const direction = 'next';
		const glyph = '&#9654;';
		const cCarousel = renderer.create(<Carousel />);
		cCarousel.nextImage = jest.fn();
		const cCarouselArrow = renderer.create(<CarouselArrow direction={direction} clickFunction={cCarousel.nextImage} glyph={glyph} />);
		let tree = cCarouselArrow.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CarouselArrow Prev snapshot renders', () => {
        const direction = 'prev';
		const glyph = '&#9664;';
		const cCarousel = renderer.create(<Carousel />);
		cCarousel.nextImage = jest.fn();
		const cCarouselArrow = renderer.create(<CarouselArrow direction={direction} clickFunction={cCarousel.nextImage} glyph={glyph} />);
		let tree = cCarouselArrow.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('CarouselDetails snapshot renders', () => {
        const index = 1 ;
        const length = 135 ;
		const cCarouselDetails = renderer.create(<CarouselDetails index={index} length={length} image={image}/>);
		let tree = cCarouselDetails.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
