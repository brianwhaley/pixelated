import { SocialCards } from '../components/socialcard/pixelated.socialcard'
import '../components/socialcard/pixelated.socialcard.css'

const mySources = {
	blog: { url: 'https://blog.pixelated.tech/feed/', iconSrcAlt: 'Pixelated Views Blog Post' },
	etsy: { url: 'https://www.etsy.com/people/bwhaley73/favorites/items.rss' },
	/* foursquare: { url: 'https://feeds.foursquare.com/history/LZSXBIJMSBHI5EQXV1GTQOVQW5XRJ0FP.rss' }, */
	/* goodreads:{ url: 'https://www.goodreads.com/review/list?id=49377228&v=2&key=mRDzpwnLeoPPAQf7CAIpPQ&shelf=currently-reading' }, */
	goodreads: { url: 'https://www.goodreads.com/review/list_rss/49377228?key=CAJAyLh9iRMHgyWZ781elQK_Bs8acH23gMzA2mvwiBIwPaah&shelf=currently-reading' },
	pinterest: { url: 'https://www.pinterest.com/brianwhaley/feed.rss' },
	tumblr: { url: 'http://pixelatedviews.tumblr.com/rss' },
	twitter: { url: 'https://twitrss.me/twitter_user_to_rss/?user=brianwhaley' },
	youtube: { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCKk2eBwml-4mEsmMK-dK6sQ' }
}

export default {
	title: 'SocialCards',
	component: SocialCards
}

export const Primary = {
	args: {
		sources: mySources
	}
}
