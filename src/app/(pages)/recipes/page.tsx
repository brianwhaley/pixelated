"use client";

import React from "react";
import { CalloutHeader } from "@brianwhaley/pixelated-components";
import { RecipeBook } from "@brianwhaley/pixelated-components";
import RecipeData from "@/app/data/recipes.json";

export default function Recipes() {
	const recipeCategories = ["bread", "appetizer", "dinner", "slow cooker", "side dish", "salad", "dessert"];
	return (
		<div className="section-container">
			<CalloutHeader title="Pace, Barbano, and Whaley Family Recipes" />
			<div className="grid12">&nbsp;</div>
			<RecipeBook recipeData={RecipeData} recipeCategories={recipeCategories} />
		</div>
	);
}
