import { RecipeBook } from '../components/recipe/pixelated.recipe'
import '../components/recipe/pixelated.recipe.css'
import RecipeData from '../components/recipe/recipes.json'

const categories = ['bread', 'appetizer', 'dinner', 'slow cooker', 'side dish', 'salad', 'dessert']

export default {
	title: 'Recipe Book',
	component: RecipeBook
}

export const Primary = {
	args: {
		recipeData: RecipeData,
		recipeCategories: categories
	}
}
