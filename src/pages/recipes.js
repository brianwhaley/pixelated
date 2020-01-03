import React, { Component } from 'react';
import RecipeBook from '../components/pixelated.recipe.js';
import recipeData from '../data/recipes.json';

export default class Recipes extends Component {

	recipeCategories = ["bread", "appetizer","dinner","slow cooker","side dish","salad","dessert"];

    render() {
        return (
            <div className="content-container">
				<RecipeBook recipeData={recipeData} recipeCategories={this.recipeCategories} />
			</div>
        );
    }
}

