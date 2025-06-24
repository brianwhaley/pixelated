import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './pixelated.recipe.css';

/* 
TODO #9 Recipe Component: Change URL so you can deep link to a specific recipe
TODO: #22 Recipe Component: Convert to TypeScript
*/


/* http://microformats.org/wiki/h-recipe */


/* ========== RECIPE BOOK ========== */
export function RecipeBook(props) {
	RecipeBook.propTypes = {
		recipeData: PropTypes.object.isRequired,
		recipeCategories: PropTypes.array.isRequired
	};

	const [ recipeElems ] = useState( generateMyElems() );
	const [ outputElems, setOutputElems ] = useState(  ); 
	const [ showOnlyCat, setShowOnlyCat ] = useState('');
	const [ showOnlyRecipe, setShowOnlyRecipe ] = useState(''); 

	function generateMyElems () {
		const myElems = [];
		for (const catKey in props.recipeCategories) {
			const category = props.recipeCategories[catKey];
			myElems[category] = [];
			for (const recipeKey in props.recipeData.items) {
				const recipe = props.recipeData.items[recipeKey];
				const cats = recipe.properties.category;
				if (cats.includes(category)) {
					myElems[category].push(recipe);
				}
			}
		}
		return myElems;
	}

	function outputMyElems () {
		const myElems = [];
		let catKey = 1;
		for (const category in recipeElems) {
			const cID = 'c' + (catKey);
			myElems.push(<RecipeCategory key={cID} id={cID} className='h-recipe-category' category={category} showOnly={showOnlyCat} />);
			for (const recipeKey in recipeElems[category]) {
				const recipe = recipeElems[category][recipeKey];
				const cats = recipe.properties.category;
				const rID = cID + '-r' + (parseInt(recipeKey, 10) + 1);
				if (cats.includes(category)) {
					myElems.push(<Recipe key={rID} id={rID} recipeData={recipe} showOnly={showOnlyRecipe} />);
				}
			}
			catKey += 1;
		}
		return myElems;
	}

	useEffect(() => {
		setOutputElems( outputMyElems() );
	}, [ showOnlyCat, showOnlyRecipe ]);

	function onRecipePickListChange (optionVal) {
		let cID, rID;
		if (optionVal.includes('-')) {
			cID = optionVal.substring(0, optionVal.indexOf('-'));
			rID = optionVal;
		} else {
			cID = optionVal;
			rID = optionVal;
		}
		setShowOnlyCat(cID);
		setShowOnlyRecipe(rID);
		setOutputElems(outputMyElems());
		window.location.hash = rID;
	}

	return (
		<div id="recipes">
			<BackToTop />
			<RecipePickList 
				recipeData={props.recipeData} 
				recipeCategories={props.recipeCategories} 
				handleRecipePickListChange={onRecipePickListChange} 
			/>
			{ outputElems }
		</div>
	);
}

/* ========== RECIPE CATEGORY ========== */
export function RecipeCategory(props) {
	RecipeCategory.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		showOnly: PropTypes.string.isRequired
	};

	const isHidden = ((props.showOnly.length > 0) && (!(props.id.includes(props.showOnly))) ? { display: 'none' } : { display: 'initial' });
	return (
		<h2 id={props.id} className={props.className} style={isHidden}>{props.category}</h2>
	);
}

/* ========== RECIPE ========== */
export function Recipe (props) {
	Recipe.propTypes = {
		recipeData: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired,
		showOnly: PropTypes.string.isRequired
	};

	const recipe = props.recipeData.properties;
	const ingredients = recipe.ingredients.map((ingredient, iKey) =>
		<li key={iKey} className="p-ingredient">{ingredient}</li>
	);
	const instructions = recipe.instructions.map((instruction, iKey) =>
		<li key={iKey} className="p-instruction">{instruction}</li>
	);
	const recipeImage = (recipe.photo.length > 0 ? <img className='u-photo' src={recipe.photo} alt={recipe.name} /> : null);
	const isHidden = ((props.showOnly.length > 0) && (!(props.id.includes(props.showOnly))) ? { display: 'none' } : { display: 'initial' });
	/* event.preventDefault(); */
	
	return (
		<article id={props.id} className="h-recipe" style={isHidden}>
			<h3 className="p-name"><a name={props.id} href={`#${props.id}`} onClick={() => { return false; }}>{recipe.name}</a></h3>
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

/* ========== RECIPE PICK LIST ========== */
export function RecipePickList(props) {
	RecipePickList.propTypes = {
		recipeData: PropTypes.object.isRequired,
		recipeCategories: PropTypes.array.isRequired,
		handleRecipePickListChange: PropTypes.func.isRequired
	};

	const [recipeOptions, setRecipeOptions] = useState([]);

	function generateMyOptions () {
		const myOpts = [];
		myOpts.push(<option key='x0' value=''>Choose a recipe below:</option>);
		for (const catKey in props.recipeCategories) {
			const category = props.recipeCategories[catKey];
			const cID = 'c' + (parseInt(catKey, 10) + 1);
			myOpts.push(<option key={cID} value={cID}>=== {category.toUpperCase()} ===</option>);
			let rID = 1;
			for (const recipeKey in props.recipeData.items) {
				const recipe = props.recipeData.items[recipeKey];
				const cats = recipe.properties.category;
				if (cats.includes(category)) {
					myOpts.push(<option key={cID + '-r' + rID} value={cID + '-r' + rID}>{recipe.properties.name}</option>);
					rID += 1;
				}
			}
		}
		return myOpts;
	}

	function recipeListChanged (e) {
		if (e.target.value.length > 0) {
			props.handleRecipePickListChange(e.target.value);
		} else {
			props.handleRecipePickListChange('');
		}
	}

	useEffect(() => {
		setRecipeOptions( generateMyOptions() );
	}, []);

	return (
		<form>
			<select id="recipe-list" name="recipe-list" onChange={recipeListChanged}>
				{ recipeOptions }
			</select>
		</form>
	);
}

/* ========== RECIPE BACK TO TOP ========== */
export function BackToTop() {
	function scrollToTop(){
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
		return false;
	}
	return (
		<div className="backToTop">
			<a href="#top" onClick={scrollToTop}>
				<div><img src="/images/icons/up.jpg" alt="Back To Top" /></div>
				<div>Back To Top</div>
			</a>
		</div>
	);
}
