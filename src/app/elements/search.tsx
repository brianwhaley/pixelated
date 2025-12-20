"use client";

import React from "react";
import PropTypes from 'prop-types';
import { GoogleSearch } from "@pixelated-tech/components";

export default function Search() {
	return (
		<div className="section-container" suppressHydrationWarning>
			<GoogleSearch id="009500278966481927899:bcssp73qony" />
		</div>
	);
}
Search.prototypes = {
	id: PropTypes.string.isRequired,
};