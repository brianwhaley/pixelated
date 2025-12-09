'use client';

import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
// import { type GravatarProfile } from './gravatar.functions';
import { SmartImage } from './cloudinary.image';
import { usePixelatedConfig } from '../config/config.client';

/* export type GravatarCardProps = {
	// Gravatar profile data (fetched server-side)
	profile?: GravatarProfile | null;
	// Field overrides (if provided, these override profile data)
	displayName?: string;
	thumbnailUrl?: string;
	aboutMe?: string;
	currentLocation?: string;
	job_title?: string;
	company?: string;
	pronouns?: string;
	profileUrl?: string;
	// Additional custom fields not in Gravatar
	customRole?: string; // Alternative to job_title
	socialLinks?: {
		github?: string;
		linkedin?: string;
		twitter?: string;
		instagram?: string;
		website?: string;
	};
	// Layout options
	layout?: 'horizontal' | 'vertical';
	direction?: 'left' | 'right'; // photo position (for horizontal layout)
	avatarSize?: number; // in pixels
	compact?: boolean; // compact variant
}; */


GravatarCard.propTypes = {
	// Gravatar profile data (fetched server-side)
	profile: PropTypes.shape({
		hash: PropTypes.string,
		requestHash: PropTypes.string,
		profileUrl: PropTypes.string,
		preferredUsername: PropTypes.string,
		thumbnailUrl: PropTypes.string,
		displayName: PropTypes.string,
		pronouns: PropTypes.string,
		aboutMe: PropTypes.string,
		currentLocation: PropTypes.string,
		job_title: PropTypes.string,
		company: PropTypes.string,
		accounts: PropTypes.arrayOf(
			PropTypes.shape({
				domain: PropTypes.string,
				display: PropTypes.string,
				url: PropTypes.string,
				iconUrl: PropTypes.string,
				username: PropTypes.string,
				verified: PropTypes.bool,
				name: PropTypes.string,
				shortname: PropTypes.string,
			})
		),
		emails: PropTypes.arrayOf(
			PropTypes.shape({
				primary: PropTypes.string,
				value: PropTypes.string,
			})
		),
	}),
	// Field overrides (if provided, these override profile data)
	displayName: PropTypes.string,
	thumbnailUrl: PropTypes.string,
	aboutMe: PropTypes.string,
	currentLocation: PropTypes.string,
	job_title: PropTypes.string,
	company: PropTypes.string,
	pronouns: PropTypes.string,
	profileUrl: PropTypes.string,
	// Additional custom fields not in Gravatar
	customRole: PropTypes.string, // Alternative to job_title
	socialLinks: PropTypes.shape({
		github: PropTypes.string,
		linkedin: PropTypes.string,
		twitter: PropTypes.string,
		instagram: PropTypes.string,
		website: PropTypes.string,
	}),
	// Layout options
	layout: PropTypes.oneOf(['horizontal', 'vertical']),
	direction: PropTypes.oneOf(['left', 'right']), // photo position (for horizontal layout)
	avatarSize: PropTypes.number, // in pixels
	compact: PropTypes.bool, // compact variant
};
export type GravatarCardType = InferProps<typeof GravatarCard.propTypes>;
export function GravatarCard(props: GravatarCardType) {
	const {
		profile,
		layout = 'horizontal',
		direction = 'left',
		avatarSize = 120,
		compact = false,
	} = props;

	// Merge: prop overrides take precedence over Gravatar data
	const displayName = props.displayName ?? profile?.displayName ?? 'Unknown';
	const avatarUrl = props.thumbnailUrl ?? profile?.thumbnailUrl ?? `https://www.gravatar.com/avatar/00000000000000000000000000000000?s=${avatarSize}&d=mp`;
	const aboutMe = props.aboutMe ?? profile?.aboutMe;
	const jobTitle = props.job_title ?? props.customRole ?? profile?.job_title;
	const company = props.company ?? profile?.company;
	const location = props.currentLocation ?? profile?.currentLocation;
	const pronouns = props.pronouns ?? profile?.pronouns;
	const profileLink = props.profileUrl ?? profile?.profileUrl;

	// Social links: props override, fallback to Gravatar accounts
	const githubUrl = props.socialLinks?.github ?? profile?.accounts?.find((a) => a && a.shortname === 'github')?.url;
	const linkedinUrl = props.socialLinks?.linkedin ?? profile?.accounts?.find((a) => a && a.shortname === 'linkedin')?.url;
	const twitterUrl = props.socialLinks?.twitter ?? profile?.accounts?.find((a) => a && a.shortname === 'twitter')?.url;
	const instagramUrl = props.socialLinks?.instagram ?? profile?.accounts?.find((a) => a && a.shortname === 'instagram')?.url;
	const websiteUrl = props.socialLinks?.website;

	const isHorizontal = layout === 'horizontal';
	const photoOnRight = direction === 'right';

	const config = usePixelatedConfig();

	const avatarElement = (
		<div style={{ flexShrink: 0 }}>
			<SmartImage
				src={avatarUrl}
				alt={displayName}
				title={displayName}
				width={avatarSize ?? 120}
				height={avatarSize ?? 120}
				style={{
					borderRadius: '50%',
					objectFit: 'cover',
					display: 'block',
				}}
				cloudinaryEnv={config?.cloudinary?.product_env}
				cloudinaryDomain={config?.cloudinary?.baseUrl}
				cloudinaryTransforms={config?.cloudinary?.transforms}
			/>
		</div>
	);

	const contentElement = (
		<div style={{ flex: 1, minWidth: 0 }}>
			<div style={{ marginBottom: 8 }}>
				<h3 style={{ margin: 0, fontSize: compact ? '1.1em' : '1.4em' }}>
					{profileLink ? (
						<a href={profileLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
							{displayName}
						</a>
					) : (
						displayName
					)}
				</h3>
				{pronouns && <span style={{ fontSize: '0.9em', color: '#666', marginLeft: 8 }}>({pronouns})</span>}
			</div>

			{(jobTitle || company) && (
				<div style={{ fontSize: '0.95em', color: '#555', marginBottom: 8 }}>
					{jobTitle && <strong>{jobTitle}</strong>}
					{jobTitle && company && <span> at </span>}
					{company && <span>{company}</span>}
				</div>
			)}

			{location && (
				<div style={{ fontSize: '0.9em', color: '#777', marginBottom: 8 }}>
					📍 {location}
				</div>
			)}

			{aboutMe && !compact && (
				<p style={{ margin: '12px 0', fontSize: '0.95em', lineHeight: 1.5, color: '#333' }}>
					{aboutMe}
				</p>
			)}

			{(githubUrl || linkedinUrl || twitterUrl || instagramUrl || websiteUrl) && (
				<div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
					{githubUrl && (
						<a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none', fontSize: '1.2em' }}>
							GitHub
						</a>
					)}
					{linkedinUrl && (
						<a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', fontSize: '1.2em' }}>
							LinkedIn
						</a>
					)}
					{twitterUrl && (
						<a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2', textDecoration: 'none', fontSize: '1.2em' }}>
							X
						</a>
					)}
					{instagramUrl && (
						<a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#e4405f', textDecoration: 'none', fontSize: '1.2em' }}>
							Instagram
						</a>
					)}
					{websiteUrl && (
						<a href={websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '1.2em' }}>
							Website
						</a>
					)}
				</div>
			)}
		</div>
	);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: isHorizontal ? 'row' : 'column',
				alignItems: isHorizontal ? 'flex-start' : 'center',
				gap: 16,
				padding: 16,
				border: '1px solid #e0e0e0',
				borderRadius: 8,
				maxWidth: isHorizontal ? 600 : 400,
			}}
		>
			{isHorizontal && photoOnRight ? (
				<>
					{contentElement}
					{avatarElement}
				</>
			) : (
				<>
					{avatarElement}
					{contentElement}
				</>
			)}
		</div>
	);
}
