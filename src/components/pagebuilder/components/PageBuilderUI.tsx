"use client";

import React from 'react';
import { PageSectionHeader } from '@/components/general/pixelated.headers';
import { usePageBuilder } from '../usePageBuilder';
import { ComponentSelector } from '../components/ComponentSelector';
import { ComponentPropertiesForm } from '../components/ComponentPropertiesForm';
import { ComponentTree } from '../components/ComponentTree';
import { PageEngine } from '../components/PageEngine';

/**
 * PageBuilderUI - Main orchestrator component
 * Composes all sub-components and manages layout
 */

export function PageBuilderUI() {
	const {
		pageJSON,
		editableComponent,
		selectedPath,
		editMode,
		setEditableComponent,
		handleAddNewComponent,
		handleSelectComponent,
		handleEditComponent,
		clearSelection,
		cancelEdit,
		handleDeleteComponent,
	} = usePageBuilder();

	return (
		<div className="row-2col">
			{/* Left Column: Component Selection and Properties */}
			<div className="gridItem">
				<PageSectionHeader title="Component Selector" />
				<ComponentSelector 
					setEditableComponent={setEditableComponent}
					parentPath={selectedPath || undefined}
					editMode={editMode ? { 
						component: editMode.component.component, 
						props: editMode.component.props 
					} : undefined}
				/>
				<br />
				<ComponentPropertiesForm 
					editableComponent={editableComponent}
					onSubmit={handleAddNewComponent}
				/>
			</div>

			{/* Middle Column: Component Tree and Page JSON */}
			<div className="gridItem">
				<PageSectionHeader title="Component Tree" />
				
				{/* Action Buttons */}
				{(selectedPath || editMode) && (
					<div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
						{selectedPath && (
							<button 
								onClick={clearSelection}
								style={{
									padding: '0.5rem 1rem',
									background: '#4CAF50',
									color: 'white',
									border: 'none',
									borderRadius: '4px',
									cursor: 'pointer',
								}}
							>
								Clear Selection
							</button>
						)}
						{editMode && (
							<button 
								onClick={cancelEdit}
								style={{
									padding: '0.5rem 1rem',
									background: '#FFA726',
									color: 'white',
									border: 'none',
									borderRadius: '4px',
									cursor: 'pointer',
								}}
							>
								Cancel Edit
							</button>
						)}
					</div>
				)}
				
				{/* Component Tree */}
				{pageJSON.components.length > 0 ? (
					<ComponentTree 
						components={pageJSON.components}
						onSelectComponent={handleSelectComponent}
						onEditComponent={handleEditComponent}
						onDeleteComponent={handleDeleteComponent}
						selectedPath={selectedPath}
						editPath={editMode?.path || ''}
					/>
				) : (
					<p style={{ color: '#666', fontStyle: 'italic' }}>
						No components yet. Start by adding a component above.
					</p>
				)}
				
				{/* Collapsible Page JSON */}
				<details>
					<summary style={{ cursor: 'pointer', userSelect: 'none' }}>
						<PageSectionHeader title="Page JSON" />
					</summary>
					<pre style={{ 
						maxHeight: '400px', 
						overflow: 'auto',
						fontSize: '0.875rem'
					}}>
						{JSON.stringify(pageJSON, null, 2)}
					</pre>
				</details>
			</div>

			{/* Right Column (Full Width): Live Preview */}
			<div className="grid-s1-e2">
				<PageSectionHeader title="Live Preview" />
				<section id="preview-section">
					<div className="section-container">
						<PageEngine pageData={pageJSON} />
					</div>
				</section>
			</div>
		</div>
	);
}
