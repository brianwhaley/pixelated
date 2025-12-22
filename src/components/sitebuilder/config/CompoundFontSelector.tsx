import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontSelector } from './FontSelector';
import './CompoundFontSelector.css';

interface CompoundFontSelectorProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function CompoundFontSelector({
	id,
	name,
	label,
	required = false,
	value = '',
	onChange
}: CompoundFontSelectorProps) {
	// Parse the compound value into primary, fallback, generic parts
	const parseCompoundValue = (val: string) => {
		const parts = val.split(',').map(s => s.trim());
		return {
			primary: parts[0] || '',
			fallback: parts[1] || '',
			generic: parts[2] || ''
		};
	};

	const [fonts, setFonts] = useState(parseCompoundValue(value));

	// Update fonts when value changes externally
	useEffect(() => {
		setFonts(parseCompoundValue(value));
	}, [value]);

	// Combine fonts into a single font stack value
	const combineFonts = (fontParts: typeof fonts) => {
		return [fontParts.primary, fontParts.fallback, fontParts.generic].filter(Boolean).join(', ');
	};

	// Handle changes from individual font selectors
	const handleFontChange = (type: 'primary' | 'fallback' | 'generic', newValue: string) => {
		const updatedFonts = { ...fonts, [type]: newValue };
		setFonts(updatedFonts);
		const combinedValue = combineFonts(updatedFonts);
		onChange?.(combinedValue);
	};

	return (
		<div className="compound-font-selector">
			<label>{label}</label>
			<div className="compound-container">
				<FontSelector
					id={`${id}-primary`}
					name={`${name}-primary`}
					label="Primary Font"
					fontType="google"
					required={required}
					placeholder="Select Google Font"
					value={fonts.primary}
					onChange={(val: string) => handleFontChange('primary', val)}
				/>
				<FontSelector
					id={`${id}-fallback`}
					name={`${name}-fallback`}
					label="Fallback Font"
					fontType="websafe"
					required={false}
					placeholder="Select web-safe font"
					value={fonts.fallback}
					onChange={(val: string) => handleFontChange('fallback', val)}
				/>
				<FontSelector
					id={`${id}-generic`}
					name={`${name}-generic`}
					label="Generic Family"
					fontType="generic"
					required={false}
					placeholder="Select generic family"
					value={fonts.generic}
					onChange={(val: string) => handleFontChange('generic', val)}
				/>
			</div>
		</div>
	);
}

CompoundFontSelector.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func,
};