/**
 * Google API Authentication Utilities
 * Shared authentication logic for Google services (Analytics, Search Console, etc.)
 */

"use server";

import { google } from 'googleapis';

export interface GoogleAuthConfig {
  serviceAccountKey?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
}

export interface GoogleServiceAuth {
  auth: any;
  client: any;
}

/**
 * Create authenticated Google API client for a specific service
 */
export async function createGoogleAuthClient(
	config: GoogleAuthConfig,
	scopes: string[]
): Promise<{ success: boolean; auth?: any; error?: string }> {
	try {
		let auth: any;

		if (config.serviceAccountKey) {
			// Use service account authentication (recommended)
			const credentials = JSON.parse(config.serviceAccountKey);
			auth = new google.auth.GoogleAuth({
				credentials,
				scopes,
			});
		} else if (config.clientId && config.clientSecret && config.refreshToken) {
			// Fallback to OAuth2 (deprecated for server-side apps)
			const oauth2Client = new google.auth.OAuth2(
				config.clientId,
				config.clientSecret
			);
			oauth2Client.setCredentials({
				refresh_token: config.refreshToken,
			});
			auth = oauth2Client;
		} else {
			return {
				success: false,
				error: 'Google credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_KEY or OAuth credentials.'
			};
		}

		return { success: true, auth };
	} catch (error) {
		return {
			success: false,
			error: `Authentication failed: ${(error as Error).message}`
		};
	}
}

export interface GoogleAuthResult {
  success: boolean;
  auth?: any;
  client?: any;
  error?: string;
}

/**
 * Create Analytics Data API client
 */
export async function createAnalyticsClient(config: GoogleAuthConfig): Promise<GoogleAuthResult> {
	const result = await createGoogleAuthClient(config, ['https://www.googleapis.com/auth/analytics.readonly']);
	if (!result.success) return result;

	return {
		success: true,
		client: google.analyticsdata({ version: 'v1beta', auth: result.auth }),
		auth: result.auth
	};
}

/**
 * Create Search Console API client
 */
export async function createSearchConsoleClient(config: GoogleAuthConfig): Promise<GoogleAuthResult> {
	const result = await createGoogleAuthClient(config, ['https://www.googleapis.com/auth/webmasters.readonly']);
	if (!result.success) return result;

	return {
		success: true,
		client: google.searchconsole({ version: 'v1', auth: result.auth }),
		auth: result.auth
	};
}