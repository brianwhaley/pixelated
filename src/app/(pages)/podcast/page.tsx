"use client";

import React, { useEffect, useState } from 'react';
import { PageTitleHeader } from '@pixelated-tech/components';
import { PageSection } from '@pixelated-tech/components';
import { MicroInteractions } from "@pixelated-tech/components";
import { ToggleLoading } from '@pixelated-tech/components';
import { getSpotifyEpisodes, type SpotifyPodcastEpisodeType } from '@pixelated-tech/components';
import { getSpotifySeries, type SpotifyPodcastSeriesType } from '@pixelated-tech/components';
import { PodcastEpisodeList } from '@pixelated-tech/components';
import { SchemaPodcastEpisode, SchemaPodcastSeries } from '@pixelated-tech/components';
import { mapPodcastEpisodeToSchema, mapPodcastSeriesToSchema } from '@pixelated-tech/components';

const podSite = "https://anchor.fm/s/10fc04b98/podcast/rss";

export default function Podcast() {

	const [ series, setSeries ] = useState<SpotifyPodcastSeriesType | null>(null);
	const [ episodes, setEpisodes ] = useState<SpotifyPodcastEpisodeType[]>([]);

	useEffect(() => {
		ToggleLoading({show: true});
		(async () => {
			const series = await getSpotifySeries({ rssURL: podSite });
			setSeries(await series ?? null);
			const episodes = await getSpotifyEpisodes({ rssURL: podSite });
			episodes?.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
			setEpisodes(await episodes ?? []);
			ToggleLoading({show: false});
		})();
	}, []);
	
	useEffect(() => {
		MicroInteractions({ 
			scrollfadeElements: '.tile , .blogPostSummary, .scrollFadeElement',
		});
	}, [episodes]); 

	return (
		<>
			{series && <SchemaPodcastSeries series={mapPodcastSeriesToSchema(series)} />}
			{episodes.map((episode, index) => (
				<SchemaPodcastEpisode key={index} episode={mapPodcastEpisodeToSchema(episode)} />
			))}
			<PageTitleHeader title="Pixelated Technologies Podcast Episodes" />
			<PageSection columns={1} maxWidth="1024px" id="podcast-section">
				<PodcastEpisodeList episodes={episodes} />
			</PageSection>
		</>
	);
}

