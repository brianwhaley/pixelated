"use client";

import React from "react";
import PropTypes from 'prop-types';
import { GoogleSearch } from "@pixelated-tech/components";

interface SearchProps {
	id: string;
}

export default function Search(props: SearchProps) {
	return (
		<div className="section-container" suppressHydrationWarning>
			<GoogleSearch id={props.id} />
		</div>
	);
}
Search.prototypes = {
	id: PropTypes.string.isRequired,
};