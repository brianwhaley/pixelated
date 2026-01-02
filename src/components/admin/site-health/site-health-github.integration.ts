/**
 * Git Health Integration Services
 * Server-side utilities for analyzing git repository health
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
  version?: string;
}

export interface GitHealthResult {
  commits: GitCommit[];
  timestamp: string;
  status: 'success' | 'error';
  error?: string;
}

export interface SiteConfig {
  name: string;
  localPath: string;
}

/**
 * Analyze git repository health for a site
 */
export async function analyzeGitHealth(siteConfig: SiteConfig, startDate?: string, endDate?: string): Promise<GitHealthResult> {
	try {
		const { localPath } = siteConfig;

		// Check if the local path exists and is a git repository
		if (!fs.existsSync(localPath)) {
			throw new Error('Site directory not found');
		}

		const gitDir = path.join(localPath, '.git');
		if (!fs.existsSync(gitDir)) {
			throw new Error('Not a git repository');
		}

		// Build git log command with date range
		let sinceOption = '--since="30 days ago"';
		if (startDate && endDate) {
			sinceOption = `--since="${startDate}" --before="${endDate}"`;
		} else if (startDate) {
			sinceOption = `--since="${startDate}"`;
		} else if (endDate) {
			sinceOption = `--before="${endDate}"`;
		}

		// Get git log
		const gitCommand = `git log --oneline ${sinceOption} --pretty=format:"%H|%ad|%s|%an" --date=iso`;
		const { stdout: logOutput } = await execAsync(gitCommand, { cwd: localPath });

		const commits: GitCommit[] = logOutput
			.trim()
			.split('\n')
			.filter(line => line.trim())
			.map(line => {
				const [hash, date, ...messageParts] = line.split('|');
				const message = messageParts.slice(0, -1).join('|');
				const author = messageParts[messageParts.length - 1];

				return {
					hash,
					date,
					message,
					author
				};
			})
			.filter(commit => !/^\d+\.\d+\.\d+$/.test(commit.message.trim())) // Filter out version-only commits
			.slice(0, (startDate && endDate) ? 100 : 20); // Limit to more commits when date range is specified

		// Try to associate commits with versions
		for (const commit of commits) {
			try {
				const { stdout: tagOutput } = await execAsync(
					`git describe --tags --contains ${commit.hash} 2>/dev/null || echo ""`,
					{ cwd: localPath }
				);

				if (tagOutput.trim()) {
					commit.version = tagOutput.trim();
				}
			} catch {
				// Ignore errors for commits not associated with tags
			}
		}

		return {
			commits,
			timestamp: new Date().toISOString(),
			status: 'success'
		};

	} catch (error) {
		return {
			commits: [],
			timestamp: new Date().toISOString(),
			status: 'error',
			error: error instanceof Error ? error.message : 'Failed to analyze git health'
		};
	}
}