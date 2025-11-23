/**
 * PageBuilder V2 - Enhanced page builder with nested components and PropTypes introspection
 * 
 * Features:
 * - Nested component support - layout components can contain other components
 * - PropTypes introspection - automatically generates form fields based on component PropTypes
 * - Component tree viewer with edit/add child functionality
 * - Live preview of components
 * - Collapsible Page JSON viewer
 */

"use client";

import React from "react";
import { PageBuilderUI } from '@brianwhaley/pixelated-components';

export default function PageBuilder() {
	return <PageBuilderUI apiEndpoint="/api/pagebuilder" />;
}
