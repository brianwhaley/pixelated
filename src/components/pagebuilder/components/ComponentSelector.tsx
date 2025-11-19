
import React, { useEffect, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
// import { FormEngine } from '../../form/pixelated.form';
import { componentMap /* , componentTypes */ } from '../lib/componentMap';
import { generateFieldJSON } from '../lib/componentGeneration';

/**
 * ComponentSelector - Two-phase component selection
 * Phase 1: Select component type
 * Phase 2: Auto-generate property form based on PropTypes
 */

ComponentSelector.propTypes = {
	setEditableComponent: PropTypes.func.isRequired,
	parentPath: PropTypes.string,
	editMode: PropTypes.shape({
		component: PropTypes.string,
		props: PropTypes.object
	}),
};

type ComponentSelectorProps = InferProps<typeof ComponentSelector.propTypes>;

export function ComponentSelector(props: ComponentSelectorProps) {
	const { setEditableComponent, parentPath, editMode } = props;
	const [lastEditMode, setLastEditMode] = useState<string>('');
	
	// If in edit mode, auto-generate form on mount
	useEffect(() => {
		if (editMode && editMode.component) {
			// Create a stable key to track if this is a new edit mode
			const editKey = `${editMode.component}-${JSON.stringify(editMode.props)}`;
			if (editKey !== lastEditMode) {
				const componentJSON = generateFieldJSON(
					editMode.component, 
					editMode.props, 
					parentPath || undefined
				);
				setEditableComponent(componentJSON);
				setLastEditMode(editKey);
			}
		} else if (lastEditMode !== '') {
			// Reset when exiting edit mode
			setLastEditMode('');
		}
	}, [editMode, lastEditMode, setEditableComponent, parentPath]);

	/* 
    function handlePhaseOneSubmit(event: Event) {
		const target = event.target as HTMLFormElement;
		const myType = target.type.value;
		const myComponent = componentMap[myType as keyof typeof componentMap] 
			? myType 
			: Object.keys(componentMap)[0];
		const componentJSON = generateFieldJSON(myComponent, undefined, parentPath || undefined);
		setEditableComponent(componentJSON);
		return true;
	}
    */

	function handleComponentChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const selectedComponent = event.target.value;
		if (selectedComponent) {
			const componentJSON = generateFieldJSON(selectedComponent, undefined, parentPath || undefined);
			setEditableComponent(componentJSON);
		}
	}

	const componentOptions = Object.keys(componentMap).map((name: string) => ({
		value: name,
		text: name
	}));

	return (
		<div>
			<label htmlFor="component-type-selector" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
				Component Type:
			</label>
			<select 
				id="component-type-selector"
				onChange={handleComponentChange}
				defaultValue=""
				style={{
					marginBottom: '1rem',
					fontSize: '1rem',
					border: '1px solid #ccc',
					borderRadius: '4px'
				}}
			>
				<option value="" disabled>Select a component...</option>
				{componentOptions.map(option => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
