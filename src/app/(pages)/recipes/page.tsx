"use client";

import React from "react";
import { CalloutHeader } from "@/app/components/callout/pixelated.callout";
import { RecipeBook } from "@/app/components//recipe/pixelated.recipe";
import RecipeData from "@/app/data/recipes.json";

export default function Recipes() {
	const recipeCategories = ["bread", "appetizer", "dinner", "slow cooker", "side dish", "salad", "dessert"];
	return (
		<div className="section-container">
			<CalloutHeader title="Pace, Barbano, and Whaley Family Recipes" />
			<RecipeBook recipeData={RecipeData} recipeCategories={recipeCategories} />
		</div>
	);
}
