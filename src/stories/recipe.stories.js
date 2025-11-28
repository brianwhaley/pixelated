import { RecipeBook } from '../components/recipe/recipe';
import '../components/recipe/recipe.css';
import RecipeData from '../data/recipes.json';
import '../css/pixelated.global.css';

const categories = ['bread', 'appetizer', 'dinner', 'slow cooker', 'side dish', 'salad', 'dessert'];

export default {
	title: 'Recipe Book',
	component: RecipeBook
};

export const BTW_Recipe = {
	args: {
		recipeData: RecipeData,
		recipeCategories: categories
	}
};
