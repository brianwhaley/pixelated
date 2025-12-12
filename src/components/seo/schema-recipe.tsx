import React from 'react';

/**
 * Recipe Schema Component
 * Generates JSON-LD structured data for recipes
 * https://schema.org/Recipe
 */

export interface RecipeSchemaProps {
	recipe: {
		'@context': string;
		'@type': string;
		name: string;
		description?: string;
		author?: {
			'@type': string;
			name: string;
		};
		datePublished?: string;
		image?: string;
		recipeYield?: string;
		prepTime?: string;
		cookTime?: string;
		totalTime?: string;
		recipeCategory?: string;
		recipeCuisine?: string;
		recipeIngredient?: string[];
		recipeInstructions?: Array<{
			'@type': string;
			text: string;
		}>;
		license?: string;
	};
}

export function RecipeSchema ({ recipe }: RecipeSchemaProps) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(recipe) }}
		/>
	);
}

export default RecipeSchema;
