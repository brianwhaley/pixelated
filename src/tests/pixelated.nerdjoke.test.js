import React from 'react';
import renderer from 'react-test-renderer';
import NerdJoke, { JokeButton } from '../components/joke/pixelated.nerdjoke';

describe('NerdJoke', () => {
	test('NerdJoke renders', () => {
		const buttonText = 'Next Joke ->';
		const cNerdJoke = renderer.create(<NerdJoke />);
		cNerdJoke.loadJoke = jest.fn();
		const cJokeButton = renderer.create(<JokeButton clickFunction={ cNerdJoke.loadJoke } buttonText={buttonText} />);
		const tree = cJokeButton.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
