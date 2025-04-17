import React from 'react';
import renderer from 'react-test-renderer';
import Recipe from '../components/recipe/pixelated.recipe';

const recipeCategories = ['bread', 'appetizer', 'dinner', 'slow cooker', 'side dish', 'salad', 'dessert'];

const recipe = {
	type: ['h-recipe'],
	properties: {
		name: ["Brian's Kielbasa and Potatoes"],
		summary: ['When I was in Munich, Germany, I found a dish just…atmosphere was great, and I had a wonderful time.'],
		author: ['Brian T. Whaley'],
		published: [''],
		yield: ['Serves 4 to 6 people'],
		duration: ['30 minutes'],
		ingredients: ['2 whole kielbasa (approx 2 lb)', '5 to 6 large potatoes', '1 large onion', '1 green bell pepper', 'Black pepper', '2 tablespoons olive oil'],
		instructions: ['In a large frying pan, heat the olive oil', 'Dice the onion and add to the frying pan at high heat', 'Quarter the kielbasa lengthwise, and dice into small pieces', 'Once the onion pieces are translucent, add in the kielbasa', 'Peel and dice the potatoes, and then add to the frying pan', 'Cover and place at medium heat for 15 minutes, mixing every 3 to 5 minutes', 'Dice the bell pepper and add to the frying pan', 'Add black pepper to taste', 'Place at high heat and mix every 3 to 5 minutes.', 'Stop when the potatoes begin to fall apart, and th…basa and potatoes are browned (approx 20 minutes)'],
		nutrition: [],
		photo: [],
		category: ['dinner'],
		license: ['http://creativecommons.org/licenses/by/2.0/']
	}
};

describe('Recipe', () => {
	test('Recipe with props snapshot renders', () => {
		const cRecipe = renderer.create(<Recipe recipeData={recipe} recipeCategories={recipeCategories}/>);
		const tree = cRecipe.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
