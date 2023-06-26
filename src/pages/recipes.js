import React, { Component } from "react";
import { RecipeBook } from "@brianwhaley/pixelated-components";
import RecipeData from "../data/recipes.json";

export default class Recipes extends Component {
	recipeCategories = ["bread", "appetizer", "dinner", "slow cooker", "side dish", "salad", "dessert"];

	render () {
		return (
			<div className="section-container">
				<RecipeBook recipeData={RecipeData} recipeCategories={this.recipeCategories} />
			</div>
		);
	}
}
