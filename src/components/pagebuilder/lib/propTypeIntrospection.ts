
import type { PropTypeInfo, FormField } from './types';

/**
 * PropTypes Introspection Utilities
 * Analyzes PropTypes to generate appropriate form fields
 */

/**
 * Analyzes PropTypes to determine the appropriate form field type
 */
export function getPropTypeInfo(propType: any): PropTypeInfo {
	if (!propType) return { type: 'text', isRequired: false };

	// PropTypes logic is inverted:
	// - Optional: PropTypes.string (HAS .isRequired property pointing to the required version)
	// - Required: PropTypes.string.isRequired (NO .isRequired property - it IS the required version)
	const isRequired = !('isRequired' in propType);
	const basePropType = propType;

	// Check for oneOf (enum/select)
	if (basePropType._propType === 'oneOf' || (basePropType.type && basePropType.type._propType === 'oneOf')) {
		const values = basePropType.values || basePropType.type?.values || [];
		return { 
			type: 'select', 
			options: values,
			isRequired 
		};
	}

	// Check for shape (object with defined props)
	if (basePropType._propType === 'shape' || (basePropType.type && basePropType.type._propType === 'shape')) {
		return { 
			type: 'object',
			options: basePropType.shapeTypes || basePropType.type?.shapeTypes || {},
			isRequired 
		};
	}

	// Check for arrayOf
	if (basePropType._propType === 'arrayOf' || (basePropType.type && basePropType.type._propType === 'arrayOf')) {
		return { 
			type: 'array',
			elementType: basePropType.elementType || basePropType.type?.elementType,
			isRequired 
		};
	}

	// Check the name property for basic types
	const typeName = basePropType.name || basePropType.type?.name || '';
	
	switch (typeName) {
	case 'number':
		return { type: 'number', isRequired };
	case 'bool':
		return { type: 'checkbox', isRequired };
	case 'func':
		return { type: 'function', isRequired };
	case 'node':
	case 'element':
		return { type: 'children', isRequired };
	case 'object':
		return { type: 'json', isRequired };
	case 'string':
	default:
		return { type: 'text', isRequired };
	}
}

/**
 * Generates appropriate form field configuration based on PropType
 */
export function generateFormFieldFromPropType(
	propName: string, 
	propType: any,
	value?: any
): FormField {
	const propInfo = getPropTypeInfo(propType);
	const baseProps: any = {
		label: propName,
		name: propName,
		id: propName,
	};
	
	// Only add required attribute when field is actually required
	// Don't pass required prop at all for optional fields (HTML treats ANY value as required)
	if (propInfo.isRequired) {
		baseProps.required = 'required';
	}
	
	// Only add defaultValue if a value is provided
	if (value !== undefined && value !== null && value !== '') {
		baseProps.defaultValue = value;
	}

	switch (propInfo.type) {
	case 'select':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'text',
				list: `${propName}-options`,
				listItems: propInfo.options?.join(', ') || '',
			}
		};

	case 'number':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'number',
			}
		};

	case 'checkbox':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'checkbox',
			}
		};

	case 'json':
	case 'object':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'text',
				placeholder: 'JSON object: {"key": "value"}',
			}
		};

	case 'array':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'text',
				placeholder: 'Comma-separated values',
			}
		};

	case 'children':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'text',
				placeholder: 'Add child components separately',
				disabled: true,
			}
		};

	case 'function':
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'text',
				placeholder: 'Function (not editable in builder)',
				disabled: true,
			}
		};

	case 'text':
	default:
		return {
			component: 'FormInput',
			props: {
				...baseProps,
				type: 'text',
			}
		};
	}
}
