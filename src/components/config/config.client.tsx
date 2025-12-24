"use client";

import React from 'react';
import type { PixelatedConfig } from './config.types';

const PixelatedConfigContext = React.createContext<PixelatedConfig | null>(null);

export const PixelatedClientConfigProvider = ({
	config,
	children,
}: {
  config: PixelatedConfig;
  children: React.ReactNode;
}) => {
	return <PixelatedConfigContext.Provider value={config}>{children}</PixelatedConfigContext.Provider>;
};

/**
 * Hook to get the Pixelated config. This throws in development when the provider is missing to
 * make misconfiguration obvious. If you prefer a non-throwing variant use `useOptionalPixelatedConfig`.
 */
export const usePixelatedConfig = (): PixelatedConfig => {
	const ctx = React.useContext(PixelatedConfigContext);
	if (!ctx) {
		// Always throw error when provider is missing (consistent across dev/prod)
		// Previously had environment-specific behavior:
		// if (process.env.NODE_ENV !== 'production') {
		//   throw new Error('PixelatedClientConfigProvider not found. Wrap your app with PixelatedClientConfigProvider.');
		// }
		// // In production return an empty object typed as PixelatedConfig to avoid runtime crashes
		// return {} as PixelatedConfig;
		throw new Error('PixelatedClientConfigProvider not found. Wrap your app with PixelatedClientConfigProvider.');
	}
	// Also throw if config is empty (no environment config loaded)
	if (Object.keys(ctx).length === 0) {
		throw new Error('Pixelated config is empty. Check that PIXELATED_CONFIG_JSON or PIXELATED_CONFIG_B64 environment variables are set.');
	}
	return ctx;
};

/** Non-throwing hook — returns null when provider not present */
/* export const useOptionalPixelatedConfig = (): PixelatedConfig | null => {
	return React.useContext(PixelatedConfigContext);
}; */
