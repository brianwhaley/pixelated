import type { PixelatedConfig } from './config.types';

/**
 * Read the full master config blob from environment.
 * This function is intended for server-side use only.
 */
export function getFullConfig(): PixelatedConfig {
	const raw = process.env.PIXELATED_CONFIG_JSON || (process.env.PIXELATED_CONFIG_B64 && Buffer.from(process.env.PIXELATED_CONFIG_B64, 'base64').toString('utf8'));
	if (!raw) return {} as PixelatedConfig;
	try {
		const parsed = JSON.parse(raw);
		return parsed as PixelatedConfig;
	} catch (err) {
		// In server environments we prefer to fail loud in logs but return an empty config to avoid crashes
		// Consumer apps should validate presence of required keys during startup.
		 
		console.error('Failed to parse PIXELATED_CONFIG JSON', err);
		return {} as PixelatedConfig;
	}
}

/**
 * Produce a client-safe copy of a full config by removing secret-like keys.
 * This will walk the object and drop any fields that match a secret pattern.
 */
export function getClientOnlyConfig(full?: PixelatedConfig): PixelatedConfig {
	const src = full ?? getFullConfig();

	function isSecretKey(key: string) {
		return /token|secret|key|password|management|access/i.test(key);
	}

	function strip(obj: any): any {
		if (!obj || typeof obj !== 'object') return obj;
		if (Array.isArray(obj)) return obj.map(strip);
		const out: any = {};
		for (const k of Object.keys(obj)) {
			if (isSecretKey(k)) continue;
			out[k] = strip(obj[k]);
		}
		return out;
	}

	return strip(src) as PixelatedConfig;
}

export default getFullConfig;
