/**
 * Shared caching utilities for Site Health components
 */

export class RouteCache {
	private cache = new Map<string, { data: any; timestamp: number }>();
	private readonly duration: number;

	constructor(durationMs: number = 60 * 60 * 1000) { // Default 1 hour
		this.duration = durationMs;
	}

	get(key: string): any | null {
		const cached = this.cache.get(key);
		if (cached && Date.now() - cached.timestamp < this.duration) {
			return cached.data;
		}
		return null;
	}

	set(key: string, data: any): void {
		this.cache.set(key, { data, timestamp: Date.now() });
	}

	clear(): void {
		this.cache.clear();
	}
}