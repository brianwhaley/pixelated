import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getFontOptions } from './google-fonts';
import './FontSelector.css';

interface FontOption {
  value: string;
  label: string;
  category?: string;
}

interface FontSelectorProps {
  id: string;
  name: string;
  label: string;
  fontType?: 'google' | 'websafe' | 'generic';
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const WEBSafe_FONTS: FontOption[] = [
	{ value: 'Arial', label: 'Arial' },
	{ value: 'Bookman', label: 'Bookman' },
	{ value: 'Comic Sans MS', label: 'Comic Sans MS' },
	{ value: 'Courier New', label: 'Courier New' },
	{ value: 'Garamond', label: 'Garamond' },
	{ value: 'Geneva', label: 'Geneva' },
	{ value: 'Georgia', label: 'Georgia' },
	{ value: 'Helvetica', label: 'Helvetica' },
	{ value: 'Impact', label: 'Impact' },
	{ value: 'Lucida Console', label: 'Lucida Console' },
	{ value: 'Monaco', label: 'Monaco' },
	{ value: 'Palatino', label: 'Palatino' },
	{ value: 'Tahoma', label: 'Tahoma' },
	{ value: 'Times New Roman', label: 'Times New Roman' },
	{ value: 'Trebuchet MS', label: 'Trebuchet MS' },
	{ value: 'Verdana', label: 'Verdana' },
];

const GENERIC_FAMILIES: FontOption[] = [
	{ value: 'cursive', label: 'cursive' },
	{ value: 'fantasy', label: 'fantasy' },
	{ value: 'monospace', label: 'monospace' },
	{ value: 'sans-serif', label: 'sans-serif' },
	{ value: 'serif', label: 'serif' },
	{ value: 'system-ui', label: 'system-ui' },
	{ value: 'ui-monospace', label: 'ui-monospace' },
	{ value: 'ui-rounded', label: 'ui-rounded' },
	{ value: 'ui-sans-serif', label: 'ui-sans-serif' },
	{ value: 'ui-serif', label: 'ui-serif' },
];

export function FontSelector({
	id,
	name,
	label,
	fontType,
	required = false,
	placeholder,
	value = '',
	onChange
}: FontSelectorProps) {
	const [inputValue, setInputValue] = useState(value);
	const [googleFonts, setGoogleFonts] = useState<FontOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	// Load Google Fonts for autocomplete
	useEffect(() => {
		if (fontType === 'google') {
			setIsLoading(true);
			getFontOptions().then(options => {
				setGoogleFonts(options);
				setIsLoading(false);
			}).catch(() => {
				setIsLoading(false);
			});
		}
	}, [fontType]);

	// Get options based on font type
	const options = useMemo(() => {
		switch (fontType) {
		case 'google':
			return googleFonts;
		case 'websafe':
			return WEBSafe_FONTS;
		case 'generic':
			return GENERIC_FAMILIES;
		default:
			return [];
		}
	}, [fontType, googleFonts]);

	// Filter options based on input
	const filteredOptions = useMemo(() => {
		if (!inputValue) return options.slice(0, 10); // Show first 10 when no input

		return options.filter(option =>
			option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toLowerCase().includes(inputValue.toLowerCase())
		).slice(0, 10); // Limit to 10 results
	}, [options, inputValue]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		setShowDropdown(true);
		onChange?.(newValue);
	};

	const handleOptionSelect = (option: FontOption) => {
		setInputValue(option.value);
		setShowDropdown(false);
		onChange?.(option.value);
	};

	const handleFocus = () => {
		setShowDropdown(true);
	};

	const handleBlur = () => {
		// Delay hiding dropdown to allow clicks on options
		setTimeout(() => setShowDropdown(false), 200);
	};

	// Generate tooltip with Google Fonts link for Google fonts
	const getTooltip = () => {
		if (fontType === 'google' && inputValue) {
			const fontName = inputValue.replace(/\s+/g, '+');
			return `👁️ [Preview ${inputValue} on Google Fonts](https://fonts.google.com/specimen/${fontName})`;
		}
		return null;
	};

	return (
		<div className="font-selector-container">
			<label htmlFor={id} className="font-selector-label">
				{label}
				{required && <span className="font-selector-required">*</span>}
				{getTooltip() && (
					<span className="font-selector-tooltip" title={getTooltip()!.replace(/\[([^\]]+)\]\([^)]+\)/, '$1')}>
            👁️
					</span>
				)}
			</label>

			<div className="font-selector-input-container">
				<input
					type="text"
					id={id}
					name={name}
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
					required={required}
					autoComplete="off"
					className="font-selector-input"
				/>

				{showDropdown && filteredOptions.length > 0 && (
					<div className="font-selector-dropdown">
						{isLoading ? (
							<div className="font-selector-loading">Loading fonts...</div>
						) : (
							filteredOptions.map((option) => (
								<div
									key={option.value}
									className="font-selector-option"
									onClick={() => handleOptionSelect(option)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											handleOptionSelect(option);
										}
									}}
									tabIndex={0}
									role="option"
									aria-selected={inputValue === option.value}
								>
									<span className="font-selector-font-name">{option.label}</span>
									{option.category && (
										<span className="font-selector-font-category">({option.category})</span>
									)}
								</div>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}

FontSelector.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	fontType: PropTypes.oneOf(['google', 'websafe', 'generic']).isRequired,
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};