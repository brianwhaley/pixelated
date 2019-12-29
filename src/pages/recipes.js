import React, { Component } from 'react';
import Recipe from '../components/recipe';
import '../css/pixelated.recipe.css';
import recipeData from '../data/recipes.json';

export default class Recipes extends Component {

	categories = ["bread", "appetizer","dinner","slow cooker","side dish","salad","dessert"];

	categorizeRecipes = () => {
		var myElems = [];
		for ( var catKey in this.categories ) {
			var category = this.categories[catKey];
			myElems.push(<h2 key={catKey + 1} className="h-recipe-category">{category}</h2>);
			for ( var recipeKey in recipeData.items ) {
				var recipe = recipeData.items[recipeKey] ;
				var cats = recipe.properties.category ;
				if (cats.includes(category)){
					myElems.push( <Recipe key={catKey + "-" + recipeKey} recipeData={recipe} /> );
				}
			}
		}
		return myElems;
	}

    render() {
		var myElems = this.categorizeRecipes();
        return (
            <div className="content-container">
				<div className="backToTop">
					<a href="#top">
						<div><img src="images/up.jpg" alt="Back To Top" /></div>
						<div>Back To Top</div>
					</a>
				</div>
				<form>
					<select name="recipe-list">
						<option value=""></option>
					</select>
				</form>
				<div id="recipes">
					{ myElems }
				</div>
			</div>
        );
    }
}

