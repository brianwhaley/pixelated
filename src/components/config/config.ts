import type { PixelatedConfig } from './config.types';

/**
 * Read the full master config blob from environment.
 * This function is intended for server-side use only.
 */
export function getFullConfig(): PixelatedConfig {
	const raw = process.env.PIXELATED_CONFIG_JSON || (process.env.PIXELATED_CONFIG_B64 && Buffer.from(process.env.PIXELATED_CONFIG_B64, 'base64').toString('utf8'));
	if (!raw) {
		console.error('PIXELATED_CONFIG not found: neither PIXELATED_CONFIG_JSON nor PIXELATED_CONFIG_B64 is set in the environment.');
		return {} as PixelatedConfig;
	}
	const source = process.env.PIXELATED_CONFIG_JSON ? 'PIXELATED_CONFIG_JSON' : 'PIXELATED_CONFIG_B64';
	try {
		const parsed = JSON.parse(raw);
		// Log non-sensitive diagnostics so CI/build logs can show which env was used and the raw size.
		try {
			if (process.env.NODE_ENV === 'production') {
				console.info(`PIXELATED_CONFIG loaded from ${source}; raw length=${raw.length}`);
			} else {
				console.debug(`PIXELATED_CONFIG loaded from ${source}; raw length=${raw.length}`);
			}
		} catch (_e) {
			void _e;
			/* ignore logging errors */
		}
		return parsed as PixelatedConfig;
	} catch (err) {
		console.error('Failed to parse PIXELATED_CONFIG JSON; source=', source, 'rawLength=', raw.length, err);
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

	try {
		return strip(src) as PixelatedConfig;
	} catch (err) {
		console.error('Failed to strip secrets from config', err);
		return {} as PixelatedConfig;
	}
}

export default getFullConfig;
