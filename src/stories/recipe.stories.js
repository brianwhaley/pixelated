import { RecipeBook } from '../components/recipe/pixelated.recipe'
import '../components/recipe/pixelated.recipe.css'
import RecipeData from '../data/recipes.json'
import '../css/pixelated.less';

const categories = ['bread', 'appetizer', 'dinner', 'slow cooker', 'side dish', 'salad', 'dessert']

export default {
	title: 'Recipe Book',
	component: RecipeBook
}

export const BTW_Resume = {
	args: {
		recipeData: RecipeData,
		recipeCategories: categories
	}
}
