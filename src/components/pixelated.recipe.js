import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/pixelated.recipe.css';


/* ========== RECIPE ========== */

export default class Recipe extends Component {
    static propTypes = {
        recipeData: PropTypes.object.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
		};
	}
    render() {
		var recipe = this.props.recipeData.properties ;
		var ingredients = recipe.ingredients.map((ingredient, iKey) =>
			<li key={iKey} className="p-ingredient">{ingredient}</li>
		);
		var instructions = recipe.instructions.map((instruction, iKey) =>
			<li key={iKey}className="p-instruction">{instruction}</li>
		);
		var recipeImage = (recipe.photo.length > 0 ? <img className='u-photo' src={recipe.photo} alt={recipe.name} /> : null);
        return (
			<article className="h-recipe">
				<h3 className="p-name">{recipe.name}</h3>
				{ recipeImage }
				<p className="p-summary">{recipe.summary}</p>
				<p>&nbsp;</p>
				<p className="p-author">Author: {recipe.author}</p>
				<p className="p-published">Published: {recipe.published}</p>
				<p className="dt-duration">Duration: {recipe.duration}</p>
				<p className="p-yield">Yield: {recipe.yield}</p>
				<h4 className="e-ingredients">Ingredients</h4>
					<ul>
						{ ingredients }
					</ul>
				<h4 className="e-instructions">Instructions</h4>
					<ol>
						{ instructions }
					</ol>
			</article>
        );
    }
}


/* http://microformats.org/wiki/h-recipe */
/*
{
	"items": [
		{
			"type": [ "h-recipe" ],
			"properties": {
				"name": [ "" ],
				"summary": [ "" ],
				"author": [ "" ],
				"published": [ "" ],
				"yield": [ "" ],
				"duration": [ "" ],
				"ingredients": [
					"",
					""
				],
				"instructions": [
					"",
					""
				],
				"nutrition": [ "" ],
				"photo": [ "" ],
				"category": [
					"",
					""
				],
				"license": [ "http://creativecommons.org/licenses/by/2.0/" ]
			}
		}
	]
}
*/
