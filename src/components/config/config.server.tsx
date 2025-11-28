import React from 'react';
import type { ReactNode } from 'react';
import type { PixelatedConfig } from './config.types';
import { getClientOnlyPixelatedConfig } from './config';

// Server wrapper: reads server env blob and sanitizes it, then mounts the client provider.
// Important: do NOT import client components at module scope — dynamically import
// the client provider inside the function so this module remains server-safe.
export async function PixelatedServerConfigProvider({
	config,
	children,
}: {
	config?: PixelatedConfig;
	children: ReactNode;
}) {
	const cfg = config ?? getClientOnlyPixelatedConfig();
	const mod = await import('./config.client');
	const Provider = mod.PixelatedClientConfigProvider;
	return <Provider config={cfg}>{children}</Provider>;
}
