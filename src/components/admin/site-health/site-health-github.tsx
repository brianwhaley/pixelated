'use client';

import React from 'react';
import { Table } from '@pixelated-tech/components';
import { SiteHealthTemplate } from './site-health-template';
import type { GitData } from './site-health-types';

interface SiteHealthGitProps {
  siteName: string;
  startDate?: string;
  endDate?: string;
}

export function SiteHealthGit({ siteName, startDate, endDate }: SiteHealthGitProps) {
	const fetchGitData = async (site: string): Promise<GitData> => {
		const params = new URLSearchParams({ site: encodeURIComponent(site) });
		if (startDate) params.append('startDate', startDate);
		if (endDate) params.append('endDate', endDate);
		const response = await fetch(`/api/site-health/git?${params.toString()}`);
		if (!response.ok) {
			throw new Error('Failed to fetch git data');
		}
		const data = await response.json();
		return data;
	};

	return (
		<SiteHealthTemplate<GitData>
			siteName={siteName}
			title="Git Push Notes"
			fetchData={fetchGitData}
		>
			{(data) => {
				if (!data || !data.success) {
					return (
						<p style={{ color: '#6b7280' }}>No git data available for this site.</p>
					);
				}

				if (data.error) {
					return (
						<p style={{ color: '#ef4444', fontSize: '0.875rem' }}>
              Error: {data.error}
						</p>
					);
				}

				// Prepare table data
				const tableData = (data.commits || []).map((commit) => ({
					Date: new Date(commit.date).toLocaleDateString(),
					Message: <span className="max-w-xs truncate inline-block" title={commit.message}>{commit.message}</span>,
					Version: commit.version ? (
						<span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
							{commit.version.split('~')[0]}
						</span>
					) : (
						<span className="text-gray-400">-</span>
					)
				}));

				return (
					<>
						<h4 className="health-site-name">
							{siteName.replace('-', ' ')}
						</h4>

						<div className="space-y-4">
							{tableData.length === 0 ? (
								<p className="text-gray-500 text-center py-4">No recent commits found</p>
							) : (
								<Table id="git-table" data={tableData} altRowColor="#DDD" />
							)}
						</div>

						<p className="health-timestamp">
              Last checked: {new Date(data.timestamp).toLocaleString()}
						</p>
					</>
				);
			}}
		</SiteHealthTemplate>
	);
}