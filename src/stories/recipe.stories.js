import React from 'react';
import { RecipeBook } from '../components/recipe/recipe';
import { PixelatedClientConfigProvider } from '../components/config/config.client';
import '../components/recipe/recipe.css';
import RecipeData from '../data/recipes.json';
import '../css/pixelated.global.css';

const mockConfig = {
	cloudinary: {
		product_env: 'dlbon7tpq',
		baseUrl: 'https://res.cloudinary.com',
		transforms: 'f_auto,c_limit,q_auto,dpr_auto',
	},
};

const categories = ['bread', 'appetizer', 'dinner', 'slow cooker', 'side dish', 'salad', 'dessert'];

export default {
	title: 'Recipe Book',
	component: RecipeBook,
	decorators: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(Story) => (
			<PixelatedClientConfigProvider config={mockConfig}>
				<Story />
			</PixelatedClientConfigProvider>
		),
	],
};

export const BTW_Recipe = {
	args: {
		recipeData: RecipeData,
		recipeCategories: categories
	}
};
