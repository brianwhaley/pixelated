/**
 * Pixelated Components ESLint Rules
 *
 * Custom ESLint rules for maintaining code quality and consistency
 * across Pixelated component libraries.
 */

import propTypesInferProps from './prop-types-inferprops.js';

export default {
  rules: {
    'prop-types-inferprops': propTypesInferProps,
  },
};