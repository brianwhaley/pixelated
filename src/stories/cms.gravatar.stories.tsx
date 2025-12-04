import React, { useEffect, useState } from 'react';
import { GravatarCard } from '../components/cms/gravatar.components';
import { getGravatarProfile, type GravatarProfile } from '../components/cms/gravatar.functions';
import { PixelatedClientConfigProvider } from '../components/config/config.client';

const mockConfig = {
	cloudinary: {
		product_env: 'dlbon7tpq',
		baseUrl: 'https://res.cloudinary.com',
		transforms: 'f_auto,c_limit,q_auto,dpr_auto',
	},
};

export default {
	title: 'CMS',
	component: GravatarCard,
	decorators: [
		(Story: any) => (
			<PixelatedClientConfigProvider config={mockConfig}>
				<Story />
			</PixelatedClientConfigProvider>
		),
	],
};

// Helper component to fetch and display Gravatar data
function GravatarCardWithData({ email, ...props }: { email: string; [key: string]: any }) {
	const [profile, setProfile] = useState<GravatarProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getGravatarProfile(email).then((data) => {
			setProfile(data);
			setLoading(false);
		});
	}, [email]);

	if (loading) return <div style={{ padding: 16 }}>Loading profile...</div>;

	return <GravatarCard profile={profile} {...props} />;
}

// Story 1: Fetch from Gravatar API (real user with profile)
export const FromGravatarAPI = () => (
	<GravatarCardWithData
		email="brian@pixelated.tech"
		layout="horizontal"
		direction="left"
		avatarSize={120}
	/>
);
FromGravatarAPI.storyName = 'Gravatar - API Fetch';

// Story 2: Prop overrides (custom data)
export const PropOverrides = () => (
	<GravatarCard
		profile={null}
		displayName="Brian Whaley"
		job_title="Founder & Designer"
		company="PixelVivid"
		currentLocation="Denville, NJ"
		aboutMe="Building beautiful web experiences for over a decade. Specializing in responsive design, brand identity, and user-centered solutions."
		socialLinks={{
			github: 'https://github.com/btwhaley',
			linkedin: 'https://linkedin.com/in/brianwhaley',
			website: 'https://pixelvivid.com',
		}}
		layout="horizontal"
		direction="left"
	/>
);
PropOverrides.storyName = 'Gravatar - Custom Data';

// Story 3: Hybrid (Gravatar + custom social links)
export const HybridData = () => (
	<GravatarCardWithData
		email="brian@pixelated.tech"
		customRole="Creative Technologist"
		socialLinks={{
			website: 'https://pixelvivid.com',
		}}
		layout="horizontal"
		direction="left"
	/>
);
HybridData.storyName = 'Gravatar - Hybrid Data';

// Story 4: Vertical layout
export const VerticalLayout = () => (
	<GravatarCardWithData
		email="brian@pixelated.tech"
		layout="vertical"
		avatarSize={150}
	/>
);
VerticalLayout.storyName = 'Gravatar - Vertical';

// Story 5: Photo on right
export const PhotoRight = () => (
	<GravatarCardWithData
		email="brian@pixelated.tech"
		layout="horizontal"
		direction="right"
		avatarSize={100}
	/>
);
PhotoRight.storyName = 'Gravatar - Right';

// Story 6: Compact variant
export const CompactVariant = () => (
	<GravatarCardWithData
		email="brian@pixelated.tech"
		layout="horizontal"
		direction="left"
		avatarSize={80}
		compact={true}
	/>
);
CompactVariant.storyName = 'Gravatar - Compact Variant';

// Story 7: No Gravatar profile (fallback to default avatar)
export const NoGravatarProfile = () => (
	<GravatarCard
		profile={null}
		displayName="Jane Doe"
		job_title="Software Engineer"
		company="Tech Corp"
		aboutMe="Passionate about building scalable systems and clean code."
		socialLinks={{
			github: 'https://github.com/janedoe',
			linkedin: 'https://linkedin.com/in/janedoe',
		}}
		layout="horizontal"
		direction="left"
	/>
);
NoGravatarProfile.storyName = 'Gravatar - No Profile';
