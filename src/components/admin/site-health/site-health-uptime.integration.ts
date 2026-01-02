import { Route53Client, GetHealthCheckStatusCommand } from '@aws-sdk/client-route-53';

export interface UptimeCheckResult {
  status: 'success' | 'error';
  data?: {
    status: string;
    message?: string;
  };
  error?: string;
}

export async function checkUptimeHealth(healthCheckId: string): Promise<UptimeCheckResult> {
	try {
		// Simple Route 53 call (global service, no region needed)
		const client = new Route53Client({});

		const response = await client.send(new GetHealthCheckStatusCommand({
			HealthCheckId: healthCheckId,
		}));

		const rawStatus = response.HealthCheckObservations?.[0]?.StatusReport?.Status;
		const status = rawStatus?.toLowerCase().includes('success') ? 'Healthy' :
			rawStatus?.toLowerCase().includes('failure') ? 'Unhealthy' : 'Unknown';

		return {
			status: 'success',
			data: {
				status
			}
		};

	} catch (error) {
		console.error('Uptime check failed:', error);
		return {
			status: 'success', // Return success with unknown status to match API behavior
			data: {
				status: 'Unknown',
				message: 'Check failed'
			}
		};
	}
}