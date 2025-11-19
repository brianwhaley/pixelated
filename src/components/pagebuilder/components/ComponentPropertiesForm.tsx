
import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
// import { PageSectionHeader } from '@/components/general/pixelated.headers';
import { FormEngine } from '@/components/form/pixelated.form';

/**
 * ComponentPropertiesForm - Displays the component properties form
 * Shows FormEngine when component is selected, placeholder otherwise
 */

ComponentPropertiesForm.propTypes = {
	editableComponent: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

type ComponentPropertiesFormProps = InferProps<typeof ComponentPropertiesForm.propTypes>;

export function ComponentPropertiesForm({ editableComponent, onSubmit }: ComponentPropertiesFormProps) {
	return (
		<>
			{ /* <PageSectionHeader title="Component Properties" /> */ }
			{editableComponent && (editableComponent as any).fields ? (
				<FormEngine 
					name="field_props" 
					id="field_props"
					onSubmitHandler={onSubmit}
					formData={editableComponent} 
				/>
			) : (
				<p style={{ color: '#666', fontStyle: 'italic', padding: '1rem' }}>
					Select a component type above to configure its properties.
				</p>
			)}
		</>
	);
}
