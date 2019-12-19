
import React from 'react';
import renderer from 'react-test-renderer';
import Carousel, { getFlickrData } from './Carousel';

describe('Carousel', () => {

  test('snapshot renders', () => {
    const component = renderer.create(<Carousel />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('previousImage renders', () => {
    const prev = getFlickrData();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

