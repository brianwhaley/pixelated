import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/pixelated.recipe.css";

/* ========== RECIPE BOOK ========== */
export class RecipeBook extends Component {
	static propTypes = {
		recipeData: PropTypes.object.isRequired,
		recipeCategories: PropTypes.array.isRequired
	};

	constructor (props) {
		super(props);
		this.state = {
			recipeElems: this.generateMyElems(),
			outputElems: [],
			showOnlyCat: "",
			showOnlyRecipe: ""
		};
		this.onRecipePickListChange = this.onRecipePickListChange.bind(this);
	}

	generateMyElems () {
		var myElems = [];
		for (var catKey in this.props.recipeCategories) {
			var category = this.props.recipeCategories[catKey];
			myElems[category] = [];
			for (var recipeKey in this.props.recipeData.items) {
				var recipe = this.props.recipeData.items[recipeKey];
				var cats = recipe.properties.category;
				if (cats.includes(category)) {
					myElems[category].push(recipe);
				}
			}
		}
		return myElems;
	}

	outputMyElems () {
		var myElems = [];
		var catKey = 1;
		for (var category in this.state.recipeElems) {
			var cID = "c" + (catKey);
			myElems.push(<RecipeCategory key={cID} id={cID} className="h-recipe-category" category={category} showOnly={this.state.showOnlyCat} />);
			for (var recipeKey in this.state.recipeElems[category]) {
				var recipe = this.state.recipeElems[category][recipeKey];
				var cats = recipe.properties.category;
				var rID = cID + "-r" + (parseInt(recipeKey, 10) + 1);
				if (cats.includes(category)) {
					myElems.push(<Recipe key={rID} id={rID} recipeData={recipe} showOnly={this.state.showOnlyRecipe} />);
				}
			}
			catKey += 1;
		}
		this.setState({ outputElems: myElems });
	}

	componentDidMount () {
		this.outputMyElems();
	}

	onRecipePickListChange (optionVal) {
		var cID, rID;
		if (optionVal.includes("-")) {
			cID = optionVal.substring(0, optionVal.indexOf("-"));
			rID = optionVal;
		} else {
			cID = optionVal;
			rID = optionVal;
		}
		this.setState({ showOnlyCat: cID, showOnlyRecipe: rID },	 () => {
			this.outputMyElems();
		});
	}

	render () {
		return (
			<div id="recipes">
				<BackToTop />
				<RecipePickList recipeData={this.props.recipeData} recipeCategories={this.props.recipeCategories} handleRecipePickListChange={this.onRecipePickListChange}/>
				{ this.state.outputElems }
			</div>
		);
	}
}

/* ========== RECIPE CATEGORY ========== */
export class RecipeCategory extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		showOnly: PropTypes.string.isRequired
	};

	render () {
		var isHidden = ((this.props.showOnly.length > 0) && (!(this.props.id.includes(this.props.showOnly))) ? { display: "none" } : { display: "initial" });
		return (
			<h2 id={this.props.id} className={this.props.className} style={isHidden}>{this.props.category}</h2>
		);
	}
}

/* ========== RECIPE ========== */
export class Recipe extends Component {
	static propTypes = {
		recipeData: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired,
		showOnly: PropTypes.string.isRequired
	};

	render () {
		var recipe = this.props.recipeData.properties;
		var ingredients = recipe.ingredients.map((ingredient, iKey) =>
			<li key={iKey} className="p-ingredient">{ingredient}</li>
		);
		var instructions = recipe.instructions.map((instruction, iKey) =>
			<li key={iKey} className="p-instruction">{instruction}</li>
		);
		var recipeImage = (recipe.photo.length > 0 ? <img className='u-photo' src={recipe.photo} alt={recipe.name} /> : null);
		var isHidden = ((this.props.showOnly.length > 0) && (!(this.props.id.includes(this.props.showOnly))) ? { display: "none" } : { display: "initial" });
		/* event.preventDefault(); */
		return (
			<article id={this.props.id} className="h-recipe" style={isHidden}>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<h3 className="p-name"><a name={this.props.id} href="#" onClick={() => { return false; }}>{recipe.name}</a></h3>
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

/* ========== RECIPE PICK LIST ========== */
export class RecipePickList extends Component {
	static propTypes = {
		recipeData: PropTypes.object.isRequired,
		recipeCategories: PropTypes.array.isRequired,
		handleRecipePickListChange: PropTypes.func.isRequired
	};

	constructor (props) {
		super(props);
		this.state = {
			recipeOptions: []
		};
		this.recipeListChanged = this.recipeListChanged.bind(this);
	}

	generateMyOptions () {
		var myOpts = [];
		myOpts.push(<option key='x0' value=''>Choose a recipe below:</option>);
		for (var catKey in this.props.recipeCategories) {
			var category = this.props.recipeCategories[catKey];
			var cID = "c" + (parseInt(catKey, 10) + 1);
			myOpts.push(<option key={cID} value={cID}>=== {category.toUpperCase()} ===</option>);
			var rID = 1;
			for (var recipeKey in this.props.recipeData.items) {
				var recipe = this.props.recipeData.items[recipeKey];
				var cats = recipe.properties.category;
				if (cats.includes(category)) {
					myOpts.push(<option key={cID + "-r" + rID} value={cID + "-r" + rID}>{recipe.properties.name}</option>);
					rID += 1;
				}
			}
		}
		this.setState({ recipeOptions: myOpts });
	}

	recipeListChanged (e) {
		if (e.target.value.length > 0) {
			this.props.handleRecipePickListChange(e.target.value);
		} else {
			this.props.handleRecipePickListChange("");
		}
	}

	componentDidMount () {
		this.generateMyOptions();
	}

	render () {
		return (
			<form>
				<select id="recipe-list" name="recipe-list" onChange={this.recipeListChanged}>
					{this.state.recipeOptions}
				</select>
			</form>
		);
	}
}

/* ========== RECIPE BACK TO TOP ========== */
export class BackToTop extends Component {
	static propTypes = {
	};

	scrollToTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
		return false;
	};

	render () {
		return (
			<div className="backToTop">
				<a href="#top" onClick={this.scrollToTop}>
					<div><img src="images/up.jpg" alt="Back To Top" /></div>
					<div>Back To Top</div>
				</a>
			</div>
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
